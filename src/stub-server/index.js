
const express = require('express');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const httpProxy = require('http-proxy');

import { loadRoutes } from './apis';


const proxy = httpProxy.createProxyServer();
const app = express();

let stubServerPort = 4000;

const angularPort = 4200;
const proxiedURL = `http://localhost:${angularPort}`;

let server;

/**
 * Set headers for CORS
 */
app.use((req, res, next) => {
  // this can cause an error when 'withCredentials' is set to true.
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * Use the body parser to get content out of POST, PUT, UPDATE, and DELETE reqs
 */
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(cookieParser());


/**
 * NG Serve - App
 */
// Proxy Socket requests (watch -> reload)
// @todo - Implement better Socket Proxy
// Technically, this breaks the socket, but enables live reload
app.get('/sockjs-node/**', function (req, res) {
  proxy.web(req, res, { target: proxiedURL });
});
app.post('/sockjs-node/**', function (req, res) {
  proxy.web(req, res, { target: proxiedURL });
});

// Ng Served Files
app.get('/', function (req, res) {
  proxy.web(req, res, { target: proxiedURL });
});

app.get('/**.js', function (req, res) {
  proxy.web(req, res, { target: proxiedURL });
});

app.get('/**.*', function (req, res) {
  proxy.web(req, res, { target: proxiedURL });
});


const loadRoutes = () => {
  loadRoutes('./apis');
}

/**
 * Serve static content
 */
// app.use('/', express.static('public'));



/**
 * We start the server in a function, incase we need to call it again
 */
const startServer = () => {
  // Close the server if it is running
  if (server && server.close && app.address()) {
    server.close();
  }
  server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });

};

startServer();
