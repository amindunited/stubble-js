const recusrsiveReadDir = require('../utils/recursive-read-dir');

const indexFiles = [];
const JSONFiles = [];

const getStubsFrom = async (stubDirectory) => {
  const files = await recusrsiveReadDir(stubDirectory);
  
  console.log('files', files);

  const filePaths = files.map(file => {

    const filePath = file;// file.replace(stubDirectory, '');
    // const url = file.replace('$__var__', ':var');
    if (file.match(/\.json/)) {
      console.log('is json file ', filePath);
      JSONFiles.push(filePath);
      return filePath;
    } else {
      console.log('is javascript? ', filePath);
      indexFiles.push(filePath);
      return filePath;
    }
  });
}

const findStubs = async (stubDirectories) => {

  const buildStubsLists = stubDirectories.map((stubDirectory) => getStubsFrom(stubDirectory));
  console.log('buildStubsLists', buildStubsLists);
  await Promise.all(buildStubsLists);

  console.log('got stubs ', indexFiles, JSONFiles);

  return {
    indexFiles,
    JSONFiles
  };

}

module.exports = findStubs;
