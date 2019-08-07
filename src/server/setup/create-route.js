
const fs = require('fs');
const path = require('path');
const readFile = require('../utils/read-file');
const globals = require('../globals');

const parseStubTemplate = require('./parse-stub-template');
const getQueries = require('./get-queries');

const createRoute = (filePath) => {

  const app = globals.app;
  const config = globals.config;

  /**
   * Remove any / all of the root directory paths from the filePath
   */
  const trimmedFilePath = config['stub-directories']
    .reduce((filePath, stubDir) => {
      return filePath.replace(stubDir, '');
    }, filePath);

  const dirPath = path.dirname(trimmedFilePath);
  const requestType = path.basename(filePath).replace(path.extname(filePath), '');
  const route = dirPath.replace(/\$__(\w*)__/g, ':$1'); // Turns '$__varname__' into :varname

  console.log('setting: ', requestType, route);
  app[requestType](route, async (req, res, next) => {
    console.log('catching route', route);
    const params = req.params;
    res.locals['context'] = {
      ...params,
      ...req.query
    }

    const queryResults = await getQueries(req, res, filePath);
    console.log('got queries ', queryResults, res.locals['responseContents']);
    console.log('loading file...', filePath);
    await readFile(filePath)
      .then(
        (fileContent) => {
          const templated = parseStubTemplate(fileContent, res.locals['context']);
          res.locals['responseContents'].push(JSON.parse(templated));
          next();
        },
        () => {
          res.locals['responseContents'].push({});
          next();
        }
      );
  });
}

module.exports = createRoute;
