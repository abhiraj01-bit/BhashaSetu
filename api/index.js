import { handleDemo } from './demo.js';
import { handleTranslate } from './translate.js';

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;
  
  if (url === '/api' && method === 'GET') {
    res.json({ status: "BhashaSetu API is running" });
  } else if (url === '/api/ping' && method === 'GET') {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  } else if (url === '/api/demo' && method === 'GET') {
    handleDemo(req, res);
  } else if (url === '/api/translate' && method === 'POST') {
    handleTranslate(req, res);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
}