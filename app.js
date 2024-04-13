const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '0.0.0.0'; // Lausche auf allen verfügbaren Netzwerkschnittstellen
const port = 3000;

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'index.html'); // Pfad zur index.html-Datei

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end(`Server Error: ${err.code}`);
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content, 'utf-8');
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
