const fs = require('fs');
const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const first = require('rxjs/operators').first;
const globals = require('./globals');

const loadConfig = require('./setup/load-config');
const { state } = require('./state/server-state');
const startServer = require('./server-methods/start-server');
const findStubs = require('./setup/find-stubs');
const sortStubs = require('./setup/sort-stubs');
const getMiddleware = require('./setup/get-middleware');
const setupStaticRoutes = require('./setup/setup-static-routes');
const setupWebSockets = require('./setup/setup-websockets');
// const customMiddleware = require('./setup/custom-middleware');

const createRoute = require('./setup/create-route');


/**
 * 
 */
const server = async () => {

  // Load Config
  const config = await loadConfig();
  
  // Add the config to the state
  state.next(Object.assign({}, state.value, { config: config}));

  // Add the config to the globals object
  globals['config'] = config;

  // Get Express Reference
  const app = express();
  globals['app'] = app;

  // Reads stub directory and returns an array of all files
  const stubFiles = await findStubs(config['stub-directories']);


  // set up request middleware from stubs
  const requestMiddleware = await getMiddleware('request', stubFiles.indexFiles);

  requestMiddleware.forEach((middleware) => {
    app.use(middleware.URL, middleware.middlewareFn)
  });

  // Set up a middleware to populate response.locals before any route handles the response:
  app.use((request, response, next) => {
    response.locals['responseContents'] = [];
    next();
  });

  // Setup static routes for assets
  if (config['static-directories'] && config['static-directories'].length > 0) {
    setupStaticRoutes(config['static-directories']);
  }

  setupWebSockets(app);

  // Set up a proxy server (if configured)
  if (config.proxy) {
    setupProxy(config.proxy);
  }

  // // Setup static routes for assets
  // if (config['static-directories'] && config['static-directories'].length > 0) {
  //   setupStaticRoutes(config['static-directories']);
  // }

  // set up routes from stubs
    // any $__var__ will be turned into
    // the dynamic route :var

    // hard coded params should be matched **before**
    // using the dynamic version
  const stubRoutes = sortStubs(stubFiles.JSONFiles);
  stubRoutes.forEach((fileRoute) => {

    // Don't include __param__ files as urls
    if (fileRoute.indexOf('__params__') >= 0) {
      return;
    }
    createRoute(fileRoute);
  });


  // set up response middleware from stubs
  const responseMiddleware = await getMiddleware('response', stubFiles.indexFiles);

  // hold responses for modification
  app.use((req, response, next) => {

    const resContent = Object.assign({}, ...response.locals['responseContents']);

    /**
     * If no response content was found...return a 404
     */
    if (response.locals['responseContents'].length <= 0) {
      response.sendStatus(404);
    } else {
      response.send(resContent);
    }

  });

  startServer(app, config);
}

 module.exports = server;