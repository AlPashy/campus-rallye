import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const port = 4001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'public')));

app.get('/login.html', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'login.html'));
});

app.listen(port, () => {
    console.log("App is listening on port", port);
});
