import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const app = express();
const port = 4001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataFilePathGruppe1 = join(__dirname, 'public/json', 'gruppe1.json');
const dataFilePathGruppe2 = join(__dirname, 'public/json', 'gruppe2.json');
const dataFilePathGruppe3 = join(__dirname, 'public/json', 'gruppe3.json');
const dataFilePathGruppe4 = join(__dirname, 'public/json', 'gruppe4.json');
const dataFilePathGruppe5 = join(__dirname, 'public/json', 'gruppe5.json');
const dataFilePathGruppe6 = join(__dirname, 'public/json', 'gruppe6.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'login.html'));
});


app.post('/speichern', (req, res) => {
  const challengeNumber = req.body.challengeNumber;
  const result = req.body.result;

  // Read existing data from JSON file
  let jsonData = [];
  if (fs.existsSync(dataFilePathGruppe1)) {
    const data = fs.readFileSync(dataFilePathGruppe1, 'utf8');
    jsonData = JSON.parse(data);
  }

  // Add new result to the data
  if (!Array.isArray(jsonData)) {
    jsonData = []; // Initialize as an empty array if not already
  }
  switch (challengeNumber) {
    case 1:
      jsonData.push({ challenge1: challengeNumber, result: result });
      break;
    case 2:
      jsonData.push({ challenge2: challengeNumber, result: result });
      break;
    case 3:
      jsonData.push({ challenge3: challengeNumber, result: result });
      break;
    case 4:
      jsonData.push({ challenge4: challengeNumber, result: result });
      break;
    case 5:
      jsonData.push({ challenge5: challengeNumber, result: result });
      break;
    case 6:
      jsonData.push({ challenge6: challengeNumber, result: result });
      break;
  }
  // Save the updated data to the JSON file
  fs.writeFileSync(dataFilePathGruppe1, JSON.stringify(jsonData));

});

app.listen(port, () => {
  console.log("App is listening on port", port);
});
