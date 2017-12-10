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

// Store port in express
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Load and attach socket.io to http server
const io = require('./io');
io.attach(server);

// Listen on provided port
server.listen(port, () => {
  console.log(`Express app running on port ${port}`);
});