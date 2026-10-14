/**
 * MamaNest Zero-Dependency Local Server
 * Run with: node server.js
 * Automatically opens in your browser and displays local Wi-Fi IP
 * so your wife can open and install it directly on her phone!
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

const PORT = 3456;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let filePath = path.join(__dirname, parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);

  // Security check: ensure path stays within directory
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Access denied');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Server Error');
      }
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalIp();
  const localUrl = `http://localhost:${PORT}`;
  const phoneUrl = `http://${localIp}:${PORT}`;

  console.log('\n======================================================');
  console.log('   🌸  MAMANEST - GENTLE CARE FOR KHUSH & KHWAISH  🌸');
  console.log('======================================================');
  console.log(`\n💻 Opening on this computer: ${localUrl}`);
  console.log(`📱 Open on Wife's Phone via Wi-Fi: ${phoneUrl}`);
  console.log('\n💡 Tip: On iPhone (Safari) tap "Share" -> "Add to Home Screen"');
  console.log('   On Android (Chrome) tap "⋮" -> "Install app" or "Add to Home screen"\n');
  console.log('Press Ctrl+C to stop the server anytime.\n');

  // Automatically launch default browser
  const startCmd = process.platform === 'win32' ? `start ${localUrl}` : (process.platform === 'darwin' ? `open ${localUrl}` : `xdg-open ${localUrl}`);
  exec(startCmd, (err) => {
    if (err) console.log('Notice: You can open your browser at', localUrl);
  });
});
