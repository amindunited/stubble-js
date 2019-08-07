// const fs = require('fs');
// const readFile = require('../utils/read-file');
const path = require('path');
const globals = require('../globals');
// const { state } = require('../state');
const configPath = path.dirname(require.main.filename);

const getMiddleware = async (fnName, filePaths) => {
  const config = globals.config;
  const promise = new Promise((resolve, reject) => {

    Promise.all(filePaths.map((filePath) => {
      const file = require(configPath + '/' + filePath);
      if (!file[fnName]) {
        return null;
      } else {

        const routePath = path
          .dirname(filePath)
          .replace(config['stub-directory'], '')// needs to handle array!!!
          .replace(/\$__(\w*)__/g, ':$1'); // Turns '$__varname__' into :varname

        return {
          URL: routePath,
          middlewareFn: file[fnName]
        }
      }

    })).then((arr) => {
      resolve(arr.filter((el) => {
        return !!el
      }));
    });
  });
  return promise;
}

module.exports = getMiddleware;