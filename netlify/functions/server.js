const express = require('express');
const fs = require('fs');
const app = express();
const port = 3001; // Choose an appropriate port

const cors = require('cors');


// Allow requests from localhost:3000
app.use(cors({ origin: 'https://random-song-swiftie.netlify.app' }));

app.use(cors({ origin: 'https://localhost:3000' }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://random-song-swiftie.netlify.app');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.get('/api/taylordata', (req, res) => {
  try {
    const rawData = fs.readFileSync('taylordata.json', 'utf8');
    const parsedData = JSON.parse(rawData);
    res.json(parsedData);
  } catch (error) {
    res.status(500).json({ error: 'Error reading data from file' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
