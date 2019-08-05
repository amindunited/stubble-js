const fs = require('fs');
const path = require('path');

const configPath = path.dirname(require.main.filename)

const loadConfig = () => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(`${configPath}/stubble.conf.json`, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      try {
        const json = JSON.parse(data);
        resolve(json);
      } catch (err) {
        console.log('Error loading config from: ', configPath, err);
        reject(err);
      }
    });
  });
  return promise;
};

module.exports = loadConfig;