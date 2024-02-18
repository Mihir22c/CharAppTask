const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')

app.use(express.json());
app.use(cors())

const jsonData = require('./data.json');

app.get('/api/data', (req, res) => {
  res.json(jsonData);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
