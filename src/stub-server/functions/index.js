const path = require('path');
const { loadJSONStub } = require('./load-json-stub');

// import { recurseDir } from './recurse-dir.mjs';
const recurseDir = require('./recurse-dir.js').recurseDir;
const readFile = require('fs').promises.readFile;

const fileExcludes = ['.ds_store'];

const loadRoutes = async () => {
  const files = await recurseDir(path.resolve(__dirname, '../apis'));
  const stubFiles = files.filter((file) => {
      // Remove system files
      if (fileExcludes.indexOf(path.basename(file).toLowerCase()) > -1) {
        return false;
      }
      return true;
    });

  return stubFiles;
}

// const traverseObject = async (obj, filePath) => {

//     const entries = Object.entries(obj);
//     const resolvedObj = await entries.reduce(async (accumulator, [key, value]) => {
//       const previous = await accumulator;
//       if (typeof value == "object" && value !== null) {
//         const children = await traverseObject(value);
//         return {...previous, ...{ [key]: children } }
//       } else if (key === '$ref') {
//         // @todo if it is a ref, we should load it, and then traverse it...
//         // resolve $ref...
//         // if it's just a { key : value } merge
//         // else traverse
//         // or ... maybe
//         // just traverse, would that work?
//         const refFile = await readFile(path.resolve(filePath, value)).then((data) => {
//           return traverseObject(JSON.parse(data), filePath);
//         });

//         return await {...previous, ...refFile }
//       } else {
//         return await {...previous, ...{ [key]: value} }
//       }

//     }, Promise.resolve({}));

//     return resolvedObj;
// }

const convertPathsToRoutes = async (paths) => {
  console.log('convertPathsToRoutes ', paths);
  const routes = paths.map(async (filePath) => {

    if (filePath === '/Users/robin/Development/auspost/mpc-authority-to-leave-ui-angular/test/stub-server/apis/atl/v2/shipments/999999.json') {
      // const JSONFile = await readFile(filePath, 'UTF8').then((data) => data);
      // const JSONObj = JSON.parse(JSONFile);
      // console.log('JSONObj', JSONObj);
      // const traversed = await traverseObject(JSONObj, path.dirname(filePath));
      // console.log('traversed', traversed);
      loadJSONStub(filePath);

    }

    const segments = filePath.split('/').slice(1);
    console.log('path: ', filePath);
    console.log('segments: ', segments);

    // const variables = segments.find((segment) => {
    //   console.log('segment var:', segment.match(/\$\{(\w*)\}/g));
    //   return segment.match(/\$\{(\w*)\}/g);
    // });

    // if the name is fixed,

    // If the name is dynamic

    // If theres just an index
    const route = path.dirname(filePath);
    return `${route.replace(/\$\{(\w*)\}/g, ':$1')}` ;

  });

  console.log('routes ', routes);
}

loadRoutes().then((paths) => convertPathsToRoutes(paths));


