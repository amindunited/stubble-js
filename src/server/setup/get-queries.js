const path = require('path');
const readFile = require('../utils/read-file');
const parseStubTemplate = require('./parse-stub-template');

const processFile = (filePath, context) => {

  return readFile(filePath)
    .then((fileContent) => {
      return JSON.parse(parseStubTemplate(fileContent, context))
    }, () => {})

}

const getQueries = async (req, res, fileRoute) => {
  const queryFileReads = [];
  const queryKeys = Object.keys(req.query);

  queryKeys.forEach((key) => {
    const fPath = path.dirname(fileRoute);
    const dynamicQueryPath = fPath + `/__params__/${key}/$__${key}__.json`;
    const staticQueryPath = fPath + `/__params__/${key}/${req.query[key]}.json`;
    queryFileReads.push(processFile(dynamicQueryPath, res.locals['context']));
    queryFileReads.push(processFile(staticQueryPath, res.locals['context']));
  })

  await Promise.all(queryFileReads).then((result) => {

    filteredResults = result.filter((val) => {
      return val;
    });

    res.locals['responseContents'].push(...filteredResults);

  });
  result = Object.assign({}, ...queryFileReads);
}

module.exports = getQueries;
