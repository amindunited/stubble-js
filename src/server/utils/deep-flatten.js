/**
 * @license
 * Copyright Robin Buckley. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
'use strict';
/**
 * A utility function to provide placeholder functionality
 * for the Array.flat() method
 *
 * Accepts a nested array and returns a flattened copy
 *
 */
const deepFlatten = (arr) => {
  if (!Array.isArray(arr)) {
    return arr;
  }

  return arr.reduce((acc, val) => {
    if ( Array.isArray(val) ) {
      return acc.concat(deepFlatten(val))
    } else {
      return acc.concat(val)
    }
  }, []);
}

module.exports = deepFlatten;