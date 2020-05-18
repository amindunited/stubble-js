
const readDir = require('fs').promises.readdir;
const lstat = require('fs').promises.lstat;

const path = require('path');

const recurseDir = async (dirPath, config) => {

  config = config ? config : {
    includeEmpty: false
  }

  const dirContents = await readDir(dirPath)
    .then((files) => files.map((file) => {
      // Make sure ever file has a fullDirectory Path
      return path.resolve(dirPath, file)
    }))
    .catch((err) => { throw(err) });

  const children = await dirContents.reduce(async (previousPromise, file) => {

    const prev = await previousPromise;

    const stats = await lstat(file);
    const isDir = stats.isDirectory();

    if (isDir) {

      const contents = await recurseDir(file);

      // Ignore empty Directories
      if (contents.length <= 0) {
        return [...prev];
      }

      return [...prev, ...contents];

    }

    return [...prev, file];

  }, Promise.resolve([]));

  if (config.includeEmpty) {
    return Array.from(new Set([...dirContents, ...children]));
  }

  return [...children].sort();

};

// export {
//   recurseDir
// };

module.exports = {
  recurseDir
};
