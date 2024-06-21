import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/ping', (req, res) => {
    res.send(true);
});

app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const dbFile = 'db.json';
    const dbData = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
    dbData.submissions.push({ name, email, phone, github_link, stopwatch_time });
    fs.writeFileSync(dbFile, JSON.stringify(dbData, null, 2));
    res.send('Submission saved.');
});

app.get('/read', (req, res) => {
    const index = parseInt(req.query.index as string, 10);
    const dbData = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
    res.json(dbData.submissions[index]);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
