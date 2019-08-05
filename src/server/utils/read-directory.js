/**
 * @license
 * Copyright Robin Buckley. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
'use strict';

const fs = require('fs');

const readDir = (dirPath) => {
  const promise = new Promise((resolve, reject) => {

    fs.readdir(dirPath, (err, files) => {

      if (err) {
        return reject(err);
      }
      return resolve(files);

    });
  });

  return promise;

};


module.exports = readDir;