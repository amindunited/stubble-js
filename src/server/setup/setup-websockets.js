const { state } = require('../state');

const setupWebSockets = (app) => {

  const expressWs = require('express-ws')(app);

  app.ws('/', (ws, req) => {
    ws.on('message', function(msg) {
      console.log(msg);
      ws.send('hey there, browser!');
      // state.next();
      // state.subscribe((snapshot) => {
      //   console.log('snapshot', snapshot);
      // });

    });
  });
}

module.exports = setupWebSockets;
