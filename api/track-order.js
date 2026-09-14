export default async function handler(req, res) {
  const queryParam = req.query?.orderId || req.query?.query || req.body?.query || req.body?.orderId || '';
  
  if (!queryParam) {
    return res.status(400).json({ success: false, message: 'Order ID or Phone Number is required' });
  }

  const cleanQuery = String(queryParam).replace(/^#/, '').trim();
  const storeDomain = process.env.VITE_SHOPIFY_STORE_DOMAIN || 'imrmuj-v6.myshopify.com';
  const adminToken = process.env.SHOPIFY_ADMIN_API_TOKEN || process.env.VITE_SHOPIFY_ADMIN_API_TOKEN;

  if (!adminToken) {
    return res.status(500).json({ success: false, message: 'SHOPIFY_ADMIN_API_TOKEN is not configured' });
  }

  try {
    // Query Shopify Admin API for order by name (#1628, #1629) or phone
    const isPhone = /^\d{10}$/.test(cleanQuery);
    const searchUrl = isPhone
      ? `https://${storeDomain}/admin/api/2024-01/orders.json?phone=${encodeURIComponent(cleanQuery)}&status=any`
      : `https://${storeDomain}/admin/api/2024-01/orders.json?name=${encodeURIComponent(cleanQuery)}&status=any`;

    const response = await fetch(searchUrl, {
      headers: {
        'X-Shopify-Access-Token': adminToken,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (data.orders && data.orders.length > 0) {
      const order = data.orders[0];
      const isFulfilled = order.fulfillment_status === 'fulfilled';
      const fulfillment = order.fulfillments?.[0] || {};
      
      const carrier = fulfillment.tracking_company || 'Shree Maruti Courier / Delhivery';
      const trackingNumber = fulfillment.tracking_number || cleanQuery;
      
      let trackingUrl = fulfillment.tracking_url || '';
      if (!trackingUrl) {
        if (carrier.toLowerCase().includes('maruti')) {
          trackingUrl = `https://track.shreemaruticourier.com/track?tracking_no=${encodeURIComponent(trackingNumber)}`;
        } else {
          trackingUrl = `https://www.delhivery.com/track/package/${encodeURIComponent(trackingNumber)}`;
        }
      }

      // Check note_attributes for attached free gift info
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

      return res.status(200).json({
        success: true,
        data: {
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
          isRealFromShopify: true
        }
      });
    } else {
      return res.status(200).json({
        success: false,
        message: `Order #${cleanQuery} not found in Shopify Admin.`
      });
    }
  } catch (err) {
    console.error('Track order API error:', err);
    return res.status(500).json({ success: false, message: 'Server error querying Shopify Admin API' });
  }
}
