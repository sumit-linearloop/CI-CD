// index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, DevOps 12ka4!');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
