const path = require('path');
const { readFile } = require('fs').promises;

// @todo these could be managed more cleanly
let dirPath;
let filePath;
let fileName;

const traverseObject = async (srcObj, context) => {

  const obj = typeof srcObj === 'string' ? await readFile(srcObj, 'UTF8').then(data => JSON.parse(data)) : srcObj;

  const entries = Object.entries(obj);

  // Reduce the object to get
  // 1) child nodes
  // 2) $ref nodes
  // 3) string replacement values
  const resolvedObj = await entries.reduce(async (accumulator, [key, value]) => {

    const previous = await accumulator;

    if (typeof value == "object" && value !== null) {

      const children = await traverseObject(value, context);
      return {...previous, ...{ [key]: children } }

    } else if (key === '$ref') {

      // @todo if this ref has a property assignment (#value) then we need to either:
      // Grab the ref from the current file (ie { $ref: '#/some_other_prop' })
      // Load the ref file and Grab the property (ie { $ref: './otherFile.json#/some_other_prop' })
      // (current) Load the whole file into that slot (ie { $ref: './otherFile.json' })

      const refFile = await readFile(path.resolve(dirPath, value)).then((data) => {
        return traverseObject(JSON.parse(data), context);
      });

      return await {...previous, ...refFile }

    } else {

      //@todo Replace Var Should be it's own function
      const contextKeys = Object.keys(context);

      const replaceVar = (prop) => {

        const match = prop.match(/\$\{(\w*)\}/);

        if (match) {
          const inContext = contextKeys.indexOf(match[1]) > -1;
          if (inContext) {

            return prop.replace(match[0], context[match[1]]);

          }
        } else {

          return prop;

        }
      }

      const __key = replaceVar(key);
      const __value = replaceVar(value);

      return {...previous, ...{ [__key]: __value} }

    }

  }, Promise.resolve({}));

  return resolvedObj;
};

const loadJSONStub = async (__filePath) => {
  // context will be made up of the :params
  const context = {
    trackingRef: '080603'
  };

  // @todo these could be passed-in in a better way
  filePath = __filePath;
  dirPath = path.dirname(__filePath);
  fileName = path.basename(__filePath);
  const resolvedObject = await traverseObject(__filePath, context);
  return resolvedObject;

};


module.exports = {
  loadJSONStub
}
