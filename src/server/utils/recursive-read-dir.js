/**
 * @license
 * Copyright Robin Buckley. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
'use strict';

const fs = require('fs');
const path = require('path');
const fileStat = require('./file-stat');
const deepFlatten = require('./deep-flatten');
const readDir = require('./read-directory');
const exclude = require('./exclude');

// const exclude = require('@amindunited/exclude');
const ignores = ['.DS_Store', '.test.js'];

const recurse = (dirPath) => {

  return readDir(dirPath)
    .then((files) => {
      const promises = [];
      files.forEach((file) => {
        if (ignores.indexOf(path.basename(file)) >= 0) {
          return;
        }
        // stat the file
        const filePath = dirPath + '/' + file;
        const filePromise = fileStat(filePath)
          .then((fileStat) => {
            if (fileStat.isDirectory()) {
              return recurse(filePath);
            }
            return filePath;
          }, (err) => {
             reject(err);
          }
        );

        // ... and push to the promises array...
        promises.push(filePromise);
      });
      return Promise.all(promises);
    }, (err) => {
      return Promise.reject(err);
    });
}

const recusrsiveReadDir = (dirPath, recursive = false) => {
  const promise = new Promise((resolve, reject) => {
    recurse(dirPath)
    .then((files) => {
      let results = deepFlatten(files);
      resolve(results);
    }, (err) => {
      reject(err);
    });
  });
  return promise;
}

module.exports = recusrsiveReadDir;
