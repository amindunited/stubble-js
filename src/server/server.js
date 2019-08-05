const first = require('rxjs/operators').first;
const loadConfig = require('./features/load-config');
const { state } = require('./state/server-state');
const startServer = require('./server-methods/start-server');
const loadStubs = require('./features/load-stubs');

const express = require('express');

/**
 * 
 */
const server = async () => {

  const config = await loadConfig();
  state.pipe(first()).subscribe((data) => {
    console.log('one sub', data);
  });

  const stubs = await loadStubs(config['stub-directory']);

  // set up request middleware from stubs

  // set up routes from stubs
    // any $__var__ will be turned into
    // the dynamic route :var

    // hard coded params should be matched **before**
    // using the dynamic version

    // set up response middleware from stubs

  // hold responses for modification

  // Add the config to the state
  const currVal = state.value;
  const newVal = Object.assign({}, currVal, { 'config':  config});
  state.next(newVal);

  startServer(config);
}

 module.exports = server;