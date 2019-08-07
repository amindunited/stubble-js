const path = require('path');

const sortStubs = (stubFiles) => {
  const results = stubFiles.sort((a, b) => {
    const aHasVariable = a.match(/\$__(\w*)__/);
    const bHasVariable = b.match(/\$__(\w*)__/);

    // If they both don't have variables,
    // then the one longest one (with the most directories '/')
    if (!aHasVariable && !bHasVariable) {
      return a.match(/\//g).length - b.match(/\//g).length;
    }
    // if only 'a' has a variable reverse
    else if (!aHasVariable) {
      return -1;
    }
    // if only 'a' has a variable continue
    else if (!bHasVariable) {
      return 1;
    }
    // Finally put the one with the earliest variable last
    else {
      const variableIndex = bHasVariable.index - aHasVariable.index;
      if (bHasVariable.index - aHasVariable.index === 0) {
        return a.match(/\//g).length - b.match(/\//g).length;
      };
      return variableIndex;
    }
  });
  return results;
}

module.exports = sortStubs;
