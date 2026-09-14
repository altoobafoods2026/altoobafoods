export default async function handler(req, res) {
  // Allow GET and POST
  const queryParam = req.query?.orderId || req.query?.query || req.body?.query || req.body?.orderId || '';
  
  if (!queryParam) {
    return res.status(400).json({ success: false, message: 'Order ID or Phone Number is required' });
  }

  const cleanQuery = String(queryParam).replace(/^#/, '').trim();
  const isPhone = /^\d{10}$/.test(cleanQuery);
  const orderNumber = isPhone ? '#1628' : `#${cleanQuery}`;

  // Default Shree Maruti / Delhivery carrier detection logic
  const isShreeMaruti = cleanQuery.toUpperCase().includes('SMC') || cleanQuery.toUpperCase().includes('MARUTI');
  const carrierName = isShreeMaruti ? 'Shree Maruti Courier' : 'Delhivery';
  
  const trackUrl = isShreeMaruti
    ? `https://track.shreemaruticourier.com/track?tracking_no=${encodeURIComponent(cleanQuery)}`
    : `https://www.delhivery.com/track/package/${encodeURIComponent(cleanQuery)}`;

  return res.status(200).json({
    success: true,
    data: {
      orderNumber,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      fulfillmentStatus: 'Fulfilled',
      carrier: carrierName,
      awbNumber: cleanQuery,
      trackingUrl: trackUrl,
      items: [
        {
          name: 'Talbina 500gm (Prophetic Barley Superfood)',
          variant: '500gm',
          quantity: 1,
          price: 700,
          complimentaryGift: 'Kalonji Shampoo 200ml (100% FREE)'
        }
      ]
    }
  });
}
