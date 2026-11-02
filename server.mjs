import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml'
};

function createAppServer() {
  return http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      const file = path.resolve(root, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
      if (!file.startsWith(root + path.sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      const data = await fs.readFile(file);
      res.writeHead(200, {
        'Content-Type': types[path.extname(file)] || 'application/octet-stream',
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff'
      });
      res.end(data);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Dosya bulunamadı / File not found.');
    }
  });
}

const preferredPort = Number(process.env.PORT || 4317);

function startServer(port, attemptsLeft = 5) {
  const server = createAppServer();
  server.on('error', err => {
    if (err.code === 'EADDRINUSE' && attemptsLeft > 0) {
      console.log(`Port ${port} zaten kullanımda (http://127.0.0.1:${port} çalışıyor). Port ${port + 1} deneniyor...`);
      startServer(port + 1, attemptsLeft - 1);
      return;
    }
    console.error('Sunucu başlatılamadı:', err.message);
    process.exit(1);
  });
  server.listen(port, '127.0.0.1', () => {
    console.log(`Local: http://127.0.0.1:${server.address().port}`);
  });
}

startServer(preferredPort);
