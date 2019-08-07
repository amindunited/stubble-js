const express = require('express');
// const { state } = require('../state');

/**
 * Cleanup old instances, and run the server
 */
const startServer = (app, config) => {
  console.log('startServer');

  app.get('/my/path/abc', () => {
    console.log('abc path');
  });

  app.get('/my/path/:id', () => {
    console.log('dynamic path');
  });


  // var myLogger = function (req, res, next) {
  //   console.log('LOGGED-ing');
  //   setTimeout(() => {
  //     console.log('setting timeout');
  //     next();
  //   }, 2000);
  // }
  
  // app.use('/log', myLogger)

  let server;

  // Close the server if it is running
  if (server && server.close && app.address()) {
    server.close();
  }

  // await createRoutes();

  server = app.listen(config['server-port'], () => {
    console.log(`Example app listening on port ${config['server-port']}`)
  });

  return server;
}

module.exports = startServer;