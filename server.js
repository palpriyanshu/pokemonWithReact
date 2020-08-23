const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.listen(8005, () => {
  console.log('listening at 8005');
});
