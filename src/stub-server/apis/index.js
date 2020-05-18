import recurseDir from './functions/recurse-dir';

const loadAPIs = () => {
  recurseDir('./').then((paths) => {
    console.log('loading apis', paths);
  });
}

export {
  loadAPIs
}
