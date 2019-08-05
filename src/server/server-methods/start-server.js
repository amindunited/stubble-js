const express = require('express');
/**
 * Cleanup old instances, and run the server
 */
const startServer = (config) => {
  console.log('startServer');
  const app = express();

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

  server = app.listen(config.serverPort, () => {
    console.log(`Example app listening on port ${config.serverPort}`)
  });

  return server;
}

module.exports = startServer;