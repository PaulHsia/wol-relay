const express = require('express');
const dgram = require('dgram');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/wake', (req, res) => {
  const password = req.query.pw;
  if (password !== process.env.PASSWORD) {
    return res.status(403).send('Forbidden');
  }

  const mac = process.env.TARGET_MAC?.replace(/[:-]/g, '').toUpperCase();
  if (!mac || mac.length !== 12) {
    return res.status(500).send('Invalid MAC address format');
  }

  const buffer = Buffer.alloc(6 + 16 * 6, 0xff);
  const macBuffer = Buffer.from(mac.match(/.{2}/g).map(h => parseInt(h, 16)));
  for (let i = 6; i < buffer.length; i += 6) {
    macBuffer.copy(buffer, i);
  }

  const client = dgram.createSocket('udp4');
  client.send(buffer, 0, buffer.length, parseInt(process.env.TARGET_PORT || '9'), process.env.BROADCAST_ADDR || '255.255.255.255', (err) => {
    client.close();
    if (err) return res.status(500).send('Failed to send packet');
    res.send('Magic packet sent');
  });
});

app.listen(port, () => {
  console.log(`WOL Relay server listening on port ${port}`);
});