const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const port = process.env.NODE_ENV || 8000;  
app.use(bodyParser.json());
app.use('/api/director', require('./view/director'));
app.use('/api/movies', require('./view/movies'));

app.listen(8000);
