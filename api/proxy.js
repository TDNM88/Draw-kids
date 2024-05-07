import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await fetch('https://www.create.xyz/integrations/anthropic-claude-sonnet/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: req.body,
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}