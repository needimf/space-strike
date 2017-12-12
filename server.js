const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
require('dotenv').config();

require('./config/database');

let app = express();

app.use(logger('dev'));

// Middleware
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// API routes

// Client-side catch all route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
let port = process.env.PORT || 3001;

// Listen on provided port
const server = app.listen(port, (err) => {
  console.log(`Express app running on port ${port}`);
});

// Load and connect socket.io
require('./io')(server);