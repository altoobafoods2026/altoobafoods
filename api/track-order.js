export default async function handler(req, res) {
  const queryParam = req.query?.orderId || req.query?.query || req.body?.query || req.body?.orderId || req.query?.phone || '';
  
  if (!queryParam) {
    return res.status(400).json({ success: false, message: 'Order ID or Phone Number is required' });
  }

  const storeDomain = process.env.VITE_SHOPIFY_STORE_DOMAIN || 'imrmuj-v6.myshopify.com';
  const adminToken = process.env.SHOPIFY_ADMIN_API_TOKEN || process.env.VITE_SHOPIFY_ADMIN_API_TOKEN;
  const delhiveryToken = process.env.DELHIVERY_API_TOKEN || 'c6a63b5af6a8d820042441c738f0e8bbc69ff91f';

  if (!adminToken) {
    return res.status(500).json({ success: false, message: 'SHOPIFY_ADMIN_API_TOKEN is not configured' });
  }

  try {
    const rawQuery = String(queryParam).trim();
    const cleanDigits = rawQuery.replace(/\D/g, '').slice(-10);
    const isPhone = cleanDigits.length === 10;
    const cleanOrderNum = rawQuery.replace(/^#/, '').trim();

    // Fetch recent orders from Shopify Admin API
    const response = await fetch(`https://${storeDomain}/admin/api/2024-01/orders.json?status=any&limit=100`, {
      headers: {
        'X-Shopify-Access-Token': adminToken,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!data.orders || data.orders.length === 0) {
      return res.status(200).json({ success: false, message: 'No orders found' });
    }

    // Filter matching orders
    const matchedOrders = data.orders.filter((o) => {
      // Order ID match (#1629 or 1629)
      if (o.name === `#${cleanOrderNum}` || String(o.order_number) === cleanOrderNum) {
        return true;
      }
      // Phone match
      if (isPhone) {
        const p1 = (o.phone || '').replace(/\D/g, '');
        const p2 = (o.shipping_address?.phone || '').replace(/\D/g, '');
        const p3 = (o.customer?.phone || '').replace(/\D/g, '');
        return p1.endsWith(cleanDigits) || p2.endsWith(cleanDigits) || p3.endsWith(cleanDigits);
      }
      return false;
    });

    if (matchedOrders.length === 0) {
      return res.status(200).json({
        success: false,
        message: `No orders found matching "${rawQuery}".`
      });
    }

    // Format orders with live Delhivery shipment tracking integration
    const formattedOrders = await Promise.all(matchedOrders.map(async (order) => {
      const isFulfilled = order.fulfillment_status === 'fulfilled';
      // Pick latest fulfillment if available
      const fulfillment = (isFulfilled && order.fulfillments && order.fulfillments.length > 0) 
        ? order.fulfillments[order.fulfillments.length - 1] 
        : {};
      
      let carrier = isFulfilled ? (fulfillment.tracking_company || 'Courier Partner') : 'Pending Dispatch';
      let trackingNumber = isFulfilled ? (fulfillment.tracking_number || '') : '';
      let trackingUrl = isFulfilled ? (fulfillment.tracking_url || '') : '';
      
      let delhiveryStatus = null;
      let delhiveryLocation = null;

      // Query Delhivery API if waybill or order ref is available
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

    return res.status(200).json({
      success: true,
      orders: formattedOrders,
      data: formattedOrders[0]
    });
  } catch (err) {
    console.error('Track order API error:', err);
    return res.status(500).json({ success: false, message: 'Server error querying Shopify Admin API' });
  }
}
