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

const jsonDataGruppe1 = readJsonData(dataFilePathGruppe1);
const jsonDataGruppe2 = readJsonData(dataFilePathGruppe2);
const jsonDataGruppe3 = readJsonData(dataFilePathGruppe3);
const jsonDataGruppe4 = readJsonData(dataFilePathGruppe4);
const jsonDataGruppe5 = readJsonData(dataFilePathGruppe5);
const jsonDataGruppe6 = readJsonData(dataFilePathGruppe6);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));
app.use(express.static(join(__dirname, 'public/design')));
app.use(express.static(join(__dirname, 'public/logic')));
app.use(express.static(join(__dirname, 'public/assets')));
app.use(express.static(join(__dirname, 'public/resultpage')));
app.use(express.static(join(__dirname, 'public/challenge')));



app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'login.html'));
});

// ...

app.post('/speichern', (req, res) => {
  const challengeNumber = req.body.challengeNumber;
  const result = req.body.result;

  saveResult(res, jsonDataGruppe1, dataFilePathGruppe1, challengeNumber, result);
});

app.post('/speichern2', (req, res) => {
  const challengeNumber = req.body.challengeNumber;
  const result = req.body.result;

  saveResult(res, jsonDataGruppe2, dataFilePathGruppe2, challengeNumber, result);
});

app.post('/speichern3', (req, res) => {
  const challengeNumber = req.body.challengeNumber;
  const result = req.body.result;

  saveResult(res, jsonDataGruppe3, dataFilePathGruppe3, challengeNumber, result);
});

app.post('/speichern4', (req, res) => {
  const challengeNumber = req.body.challengeNumber;
  const result = req.body.result;

  saveResult(res, jsonDataGruppe4, dataFilePathGruppe4, challengeNumber, result);
});

app.post('/speichern5', (req, res) => {
  const challengeNumber = req.body.challengeNumber;
  const result = req.body.result;

  saveResult(res, jsonDataGruppe5, dataFilePathGruppe5, challengeNumber, result);
});

app.post('/speichern6', (req, res) => {
  const challengeNumber = req.body.challengeNumber;
  const result = req.body.result;

  saveResult(res, jsonDataGruppe6, dataFilePathGruppe6, challengeNumber, result);
});

function readJsonData(dataFilePath) {
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  }
  return [];
}

function saveResult(res, jsonData, dataFilePath, challengeNumber, result) {
  // Add new result to the data
  if (!Array.isArray(jsonData)) {
    jsonData = []; // Initialize as an empty array if not already
  }

  const resultObject = {};
  resultObject[`challenge${challengeNumber}`] = result;
  jsonData.push(resultObject);

  // Save the updated data to the JSON file
  fs.writeFileSync(dataFilePath, JSON.stringify(jsonData));
  res.sendStatus(200);
}

app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));