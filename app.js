import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/felix.html');
});

app.post('/speichern', (req, res) => {
  const eingabe = req.body.eingabe;

  const data = {
    eingabe: eingabe
  };

  const jsonData = JSON.stringify(data);

  fs.writeFile('data.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error(err);
      res.send('Fehler beim Speichern der Daten!');
    } else {
      res.send('Daten wurden gespeichert!');
    }
  });
});

app.listen(4000, () => {
  console.log('Server gestartet auf http://localhost:4000');
});
