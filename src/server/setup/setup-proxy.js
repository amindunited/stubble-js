const httpProxy = require('http-proxy');

const setupProxy = (configProxies) => {
  const proxy = httpProxy.createProxyServer();
  configProxies.forEach((configProxy) => {
    app.get(configProxy.path, function (req, res) {
      proxy.web(req, res, {
        target: configProxy.target
      });
    });
  });
}

module.exports = setupProxy;
