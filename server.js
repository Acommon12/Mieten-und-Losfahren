require('dotenv').config(); // Lade Umgebungsvariablen aus der .env-Datei

const http = require('http');
const fs = require('fs');
const path = require('path');

// Pfad zur index.html-Datei
const filePath = path.join(__dirname, 'index.html');

// Überprüfen, ob die index.html-Datei vorhanden ist
fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`Die Datei ${filePath} konnte nicht gefunden werden.`);
    process.exit(1); // Beende den Prozess mit Fehlercode 1
  }

  // Erzeuge den HTTP-Server
  const server = http.createServer((req, res) => {
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

  // Portkonfiguration
  const PORT = process.env.PORT || 6969;

  // Starte den Server
  server.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
  });
});
