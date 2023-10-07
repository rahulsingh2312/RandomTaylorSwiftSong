const express = require('express');
const fs = require('fs');
const app = express();
const port = 3001; // Choose an appropriate port

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
