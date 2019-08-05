const recusrsiveReadDir = require('../utils/recursive-read-dir');

const loadStubs = async (stubDirectory) => {
  if (!stubDirectory) {
    console.warn('stub directory not configured, using demo');
    stubDirectory = 'tests/example-stubs';
  } 
  const files = await recusrsiveReadDir(stubDirectory);

  console.log('files', files);

  files.forEach(file => {
    const filePath = file.replace(stubDirectory, '');
    if (file.match(/\.json/)) {
      console.log('is json file ', filePath);
    } else {
      console.log('is javascript? ', filePath);
    }
  });

  return files;

}

module.exports = loadStubs;
