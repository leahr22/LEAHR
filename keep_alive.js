const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot Aktif!');
});

app.listen(3000, () => {
  console.log('Keep alive server çalışıyor.');
});
