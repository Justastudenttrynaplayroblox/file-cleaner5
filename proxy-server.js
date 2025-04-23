const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing URL parameter.');

  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get('content-type');
    res.setHeader('content-type', contentType);
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send(`Error fetching: ${err.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});