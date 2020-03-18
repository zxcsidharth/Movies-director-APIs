const express = require('express');
const bodyParser = require('body-parser');
var morgan = require('morgan');
const winston = require('./config/winstonConfig');
const app = express();
// const port = process.env.NODE_ENV || 8000;  
app.use(bodyParser.json());
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(err.status || 500);
  res.render('error');
  next();
});

app.use(morgan('combined', { stream: winston.stream }));
app.use('/api/director', require('./view/director'));
app.use('/api/movies', require('./view/movies'));

app.listen(8000);
