const fs = require('fs');
const path = require('path');
const readFile = require('../utils/read-file');

const configPath = path.dirname(require.main.filename);

const loadConfig = () => {
  const customConfigPath = `${configPath}/stubble.conf.json`;
  const defaultConfigPath = 'stubble.conf.json';

  const promise = new Promise((resolve, reject) => {
    Promise.all([readFile(defaultConfigPath), readFile(defaultConfigPath)])
    .then((data) => {
      resolve(Object.assign({}, JSON.parse(data[0]), JSON.parse(data[1])));
    }, (err) => {
      reject(err);
    });

  });
  return promise;
};

module.exports = loadConfig;