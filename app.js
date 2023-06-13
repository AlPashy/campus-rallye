import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const app = express();
const port = 4001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataFilePath = join(__dirname, '/public/data.json');
const dataFolderPath = join(__dirname, 'public', 'data');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'login.html'));
});

app.get('/anzeigeAuswertung', (req, res) => {
  const resultTemplate = fs.readFileSync(join(__dirname, 'public', 'anzeigeAuswertung.html'), 'utf8');
  res.send(resultTemplate);
});
/*
app.get('/ausfuellenErgebnisse1', (req, res) => {
  const resultTemplate = fs.readFileSync(join(__dirname, 'public', 'ausfuellenErgebnisse1.html'), 'utf8');
  res.send(resultTemplate);
});
*/

app.post('/speichern', (req, res) => {
  const eingabe = req.body.eingabe;

  // Lese die vorhandenen Daten aus der JSON-Datei
  let jsonData = [];
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    jsonData = JSON.parse(data);
  }

  // Füge die neue Eingabe den Daten hinzu
  if (!Array.isArray(jsonData)) {
    jsonData = []; // Initialize as an empty array if not already
  }
  jsonData.push(eingabe);

  // Speichere die aktualisierten Daten in der JSON-Datei
  fs.writeFileSync(dataFilePath, JSON.stringify(jsonData));

  res.redirect('/');
});


app.listen(port, () => {
  console.log("App is listening on port", port);
});
