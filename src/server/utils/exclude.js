/**
 * @license
 * Copyright Robin Buckley. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
'use strict';
/**
 * A utility function that will return a copy of an array
 * without each element that matches any given pattern in an array of excludes
 *
 */
const exclude = (sourceArray, excludes) => {
  const result = sourceArray.filter((file) => {
    for (let i = 0, len = excludes.length; i < len; i++) {
      const excludePattern = excludes[i];
      const regEx = new RegExp(excludePattern);
      if (file.match(regEx)) {
        return false;
      }
    }
    return file;
  });
  return result;
}


module.exports = exclude;