import https from 'https';
const express = require('express');
const next = require('next');
const fs = require('fs-extra');
// const https = require('https');
const appRootPath = require('app-root-path');
const sharedRoutes = require('routes/sharedRoutes');
const nextConfig = require('config/next/next.config');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
// const dev = true;
const app = next({ dev, conf: nextConfig });
const sharedRoutesHandler = sharedRoutes.getRequestHandler(app);

const keyPath = appRootPath.resolve('/config/pem/dev.key.pem');
const certPath = appRootPath.resolve('/config/pem/dev.cert.pem');

app.prepare().then(() => {
  const server = express();

  server.use(sharedRoutesHandler);

  https.createServer({
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  }, server)
  .listen(3000, (err) => {
    if (err) throw err;
    console.log('>>> Ready on https://localhost:3000');
  });
});