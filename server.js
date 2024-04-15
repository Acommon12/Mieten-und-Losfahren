const http = require('http');
const fs = require('fs');
const path = require('path');

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

const PORT = parseInt(process.env.PORT, 10) || 6969; // Verwende den von Heroku bereitgestellten Port oder Port 6969 als Standardwert

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
