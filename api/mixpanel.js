export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const MP_SECRET = process.env.MP_SECRET || 'f1293a4f5bb6bb07e2ade88c109826a5';
  const auth = 'Basic ' + Buffer.from(MP_SECRET + ':').toString('base64');

  const { endpoint, ...params } = req.query;
  if (!endpoint) { res.status(400).json({ error: 'Missing endpoint' }); return; }

  const allowed = ['segmentation', 'retention', 'engage'];
  const ep = endpoint.replace(/[^a-z]/g, '');
  if (!allowed.includes(ep)) { res.status(400).json({ error: 'Endpoint not allowed' }); return; }

  const url = new URL(`https://mixpanel.com/api/2.0/${ep}`);
  Object.entries(params).forEach(([k, v]) => {
    if (k === 'event') {
      try { url.searchParams.set(k, JSON.parse(v)); }
      catch { url.searchParams.set(k, v); }
    } else {
      url.searchParams.set(k, v);
    }
  });

  try {
    const r = await fetch(url.toString(), {
      headers: { Authorization: auth, Accept: 'application/json' }
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
