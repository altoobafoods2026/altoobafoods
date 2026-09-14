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

                const formattedOrders = matchedOrders.map((order) => {
                  const isFulfilled = order.fulfillment_status === 'fulfilled';
                  const fulfillment = (isFulfilled && order.fulfillments && order.fulfillments.length > 0) 
                    ? order.fulfillments[order.fulfillments.length - 1] 
                    : {};
                  
                  const carrier = isFulfilled ? (fulfillment.tracking_company || 'Courier Partner') : 'Pending Dispatch';
                  const trackingNumber = isFulfilled ? (fulfillment.tracking_number || '') : '';
                  
                  let trackingUrl = '';
                  if (isFulfilled) {
                    trackingUrl = fulfillment.tracking_url || '';
                    if (!trackingUrl && trackingNumber) {
                      const lowerCarrier = carrier.toLowerCase();
                      if (lowerCarrier.includes('maruti')) {
                        trackingUrl = `https://track.shreemaruticourier.com/track?tracking_no=${encodeURIComponent(trackingNumber)}`;
                      } else if (lowerCarrier.includes('delhivery')) {
                        trackingUrl = `https://www.delhivery.com/track/package/${encodeURIComponent(trackingNumber)}`;
                      } else {
                        trackingUrl = `https://track.shreemaruticourier.com/track?tracking_no=${encodeURIComponent(trackingNumber)}`;
                      }
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
                    fulfillmentStatus: order.fulfillment_status || 'unfulfilled',
                    statusText: isFulfilled ? 'Fulfilled & Dispatched' : 'Processing & Packaging at Warehouse',
                    statusCode: isFulfilled ? 3 : 2,
                    carrier: carrier,
                    awbNumber: trackingNumber,
                    trackingUrl: trackingUrl,
                    customerName: `${order.customer?.first_name || ''} ${order.customer?.last_name || ''}`.trim(),
                    items: items,
                    totalPrice: parseFloat(order.total_price || 0),
                    isRealFromShopify: true
                  };
                });

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
