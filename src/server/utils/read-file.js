/**
 * @license
 * Copyright Robin Buckley. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
'use strict';

const fs = require('fs');

module.exports = function readFile (filePath){
  const promise = new Promise((resolve, reject) =>{
    fs.readFile(filePath, 'utf8', (err, contents) => {
      if (!err) {
        resolve(contents);
      } else {
        reject(err);
      }
    });
  });
  return promise;
}