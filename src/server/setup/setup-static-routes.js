const express = require('express');
const path = require('path');
const globals = require('../globals');

const rootPath = path.dirname(require.main.filename);

const setupStaticRoutes = (staticDirectories) => {
  const app = globals.app;
  staticDirectories.forEach((staticDir) => {
    app.use(staticDir.route, express.static(path.join(staticDir.folderPath)));
  });
}

module.exports = setupStaticRoutes;
