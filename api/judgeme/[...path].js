export default async function handler(req, res) {
  // Allow GET and POST
  const allowedMethods = ['GET', 'POST'];
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Build the Judge.me target URL
  // The incoming path will be /api/judgeme/reviews or /api/judgeme/products/-1?...
  // We need to strip /api/judgeme and forward the rest to https://judge.me/api/v1
  const incomingPath = req.url.replace(/^\/api\/judgeme/, '');
  const targetUrl = `https://judge.me/api/v1${incomingPath}`;

  try {
    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    // Forward body for POST requests
    if (req.method === 'POST' && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, fetchOptions);
    const data = await response.text();

    // Forward the status code and response
    res.status(response.status);
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json');
    res.send(data);
  } catch (error) {
    console.error('Judge.me proxy error:', error);
    res.status(500).json({ error: 'Failed to proxy request to Judge.me' });
  }
}
