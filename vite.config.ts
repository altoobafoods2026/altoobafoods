import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const storeDomain = env.VITE_SHOPIFY_STORE_DOMAIN || 'imrmuj-v6.myshopify.com';
  const adminToken = env.SHOPIFY_ADMIN_API_TOKEN || env.VITE_SHOPIFY_ADMIN_API_TOKEN || '';

  return {
    server: {
      proxy: {
        '/gkx-proxy': {
          target: 'https://gkx.gokwik.co',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/gkx-proxy/, '')
        }
      }
    },
    plugins: [
      tailwindcss(),
      react(),
      {
        name: 'track-order-proxy',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.startsWith('/api/track-order')) {
              try {
                const urlObj = new URL(req.url, 'http://localhost:3000');
                const queryParam = urlObj.searchParams.get('orderId') || urlObj.searchParams.get('query') || urlObj.searchParams.get('phone') || '';
                const rawQuery = String(queryParam).trim();

                if (!rawQuery) {
                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 400;
                  res.end(JSON.stringify({ success: false, message: 'Order ID required' }));
                  return;
                }

                const cleanDigits = rawQuery.replace(/\D/g, '').slice(-10);
                const isPhone = cleanDigits.length === 10;
                const cleanOrderNum = rawQuery.replace(/^#/, '').trim();

                const response = await fetch(`https://${storeDomain}/admin/api/2024-01/orders.json?status=any&limit=100`, {
                  headers: {
                    'X-Shopify-Access-Token': adminToken,
                    'Content-Type': 'application/json'
                  }
                });

                const data = await response.json();

                if (!data.orders || data.orders.length === 0) {
                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 200;
                  res.end(JSON.stringify({ success: false, message: 'No orders found' }));
                  return;
                }

                const matchedOrders = data.orders.filter((o) => {
                  if (o.name === `#${cleanOrderNum}` || String(o.order_number) === cleanOrderNum) {
                    return true;
                  }
                  if (isPhone) {
                    const p1 = (o.phone || '').replace(/\D/g, '');
                    const p2 = (o.shipping_address?.phone || '').replace(/\D/g, '');
                    const p3 = (o.customer?.phone || '').replace(/\D/g, '');
                    return p1.endsWith(cleanDigits) || p2.endsWith(cleanDigits) || p3.endsWith(cleanDigits);
                  }
                  return false;
                });

                if (matchedOrders.length === 0) {
                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 200;
                  res.end(JSON.stringify({ success: false, message: `No orders found matching "${rawQuery}".` }));
                  return;
                }

                const delhiveryToken = env.DELHIVERY_API_TOKEN || process.env.DELHIVERY_API_TOKEN || 'c6a63b5af6a8d820042441c738f0e8bbc69ff91f';

                const formattedOrders = await Promise.all(matchedOrders.map(async (order) => {
                  const isFulfilled = order.fulfillment_status === 'fulfilled';
                  const fulfillment = (isFulfilled && order.fulfillments && order.fulfillments.length > 0) 
                    ? order.fulfillments[order.fulfillments.length - 1] 
                    : {};
                  
                  let carrier = isFulfilled ? (fulfillment.tracking_company || 'Courier Partner') : 'Pending Dispatch';
                  let trackingNumber = isFulfilled ? (fulfillment.tracking_number || '') : '';
                  let trackingUrl = isFulfilled ? (fulfillment.tracking_url || '') : '';
                  
                  let delhiveryStatus = null;
                  let delhiveryLocation = null;

                  const queryTarget = trackingNumber || cleanOrderNum;
                  if (queryTarget && delhiveryToken) {
                    try {
                      const delhiveryUrl = trackingNumber 
                        ? `https://track.delhivery.com/api/v1/packages/json/?waybill=${encodeURIComponent(trackingNumber)}&token=${delhiveryToken}`
                        : `https://track.delhivery.com/api/v1/packages/json/?ref_ids=${encodeURIComponent(cleanOrderNum)}&token=${delhiveryToken}`;

                      const dRes = await fetch(delhiveryUrl);
                      if (dRes.ok) {
                        const dData = await dRes.json();
                        const pkg = dData.ShipmentData?.[0]?.Shipment || dData.packages?.[0];
                        if (pkg && pkg.Status) {
                          delhiveryStatus = pkg.Status.Status || pkg.Status.Instructions || null;
                          delhiveryLocation = pkg.Status.StatusLocation || null;
                          if (pkg.AWB && !trackingNumber) trackingNumber = pkg.AWB;
                          if (!carrier || carrier === 'Courier Partner' || carrier === 'Pending Dispatch') {
                            carrier = 'Delhivery';
                          }
                        }
                      }
                    } catch (dErr) {
                      console.error('[Delhivery Live Tracking API Error]', dErr);
                    }
                  }

                  if (isFulfilled || delhiveryStatus) {
                    if (!trackingUrl && trackingNumber) {
                      const lowerCarrier = carrier.toLowerCase();
                      if (lowerCarrier.includes('delhivery')) {
                        trackingUrl = `https://www.delhivery.com/track/package/${encodeURIComponent(trackingNumber)}`;
                      } else if (lowerCarrier.includes('maruti')) {
                        trackingUrl = `https://track.shreemaruticourier.com/track?tracking_no=${encodeURIComponent(trackingNumber)}`;
                      } else {
                        trackingUrl = `https://www.delhivery.com/track/package/${encodeURIComponent(trackingNumber)}`;
                      }
                    }
                  }

                  let statusCode = isFulfilled ? 3 : 2;
                  let statusText = isFulfilled ? 'Fulfilled & Dispatched' : 'Processing & Packaging at Warehouse';

                  if (delhiveryStatus) {
                    const sLower = delhiveryStatus.toLowerCase();
                    if (sLower.includes('delivered')) {
                      statusCode = 5;
                      statusText = 'Delivered';
                    } else if (sLower.includes('out for delivery')) {
                      statusCode = 4;
                      statusText = 'Out for Delivery';
                    } else if (sLower.includes('in transit') || sLower.includes('dispatched') || sLower.includes('manifested')) {
                      statusCode = 3;
                      statusText = `Dispatched (${delhiveryStatus}${delhiveryLocation ? ' - ' + delhiveryLocation : ''})`;
                    }
                  }

                  let giftFromNotes = null;
                  if (Array.isArray(order.note_attributes)) {
                    const giftAttr = order.note_attributes.find(a => a.name === 'Free Gift' || a.name?.startsWith('Free Gift'));
                    if (giftAttr) giftFromNotes = giftAttr.value;
                  }

                  const items = order.line_items.map((line) => {
                    let giftProp = null;
                    if (Array.isArray(line.properties)) {
                      const p = line.properties.find(prop => prop.name === 'Free Gift Included' || prop.name === 'Gift Item');
                      if (p) giftProp = p.value;
                    }
                    return {
                      name: line.title,
                      variant: line.variant_title || 'Standard',
                      quantity: line.quantity,
                      price: parseFloat(line.price),
                      image: '/products_banner.jpeg',
                      complimentaryGift: giftProp || giftFromNotes || null
                    };
                  });

                  return {
                    orderNumber: order.name,
                    date: new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
                    financialStatus: order.financial_status,
                    fulfillmentStatus: order.fulfillment_status || (delhiveryStatus ? 'fulfilled' : 'unfulfilled'),
                    statusText: statusText,
                    statusCode: statusCode,
                    carrier: carrier,
                    awbNumber: trackingNumber,
                    trackingUrl: trackingUrl,
                    liveLocation: delhiveryLocation,
                    customerName: `${order.customer?.first_name || ''} ${order.customer?.last_name || ''}`.trim(),
                    items: items,
                    totalPrice: parseFloat(order.total_price || 0),
                    isRealFromShopify: true
                  };
                }));

                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify({
                  success: true,
                  orders: formattedOrders,
                  data: formattedOrders[0]
                }));
                return;
              } catch (err) {
                console.error('[Shopify Track Order Middleware Error]', err);
              }
            }
            next();
          });
        }
      }
    ]
  };
});
