const httpProxy = require('http-proxy');
const logger = require('./logger');

const apiProxy = httpProxy.createProxyServer();
// '/api/v1/*'
const initProxy = (app, routePath, target, options = {}) => {
  if (!target) {
    logger.error('target is not provide, please set target in your environment variable');
    throw Object('target is not provide');
  }
  app.all(routePath, (req, res) => {
    try {
      logger.reqHeaderLog(req);
      apiProxy.web(req, res, {
        ...options,
        target,
      });
    } catch (e) {
      console.log(e);
    }
  });

  apiProxy.on('error', (err, req, res) => {
    try {
      logger.error(err);
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      logger.error('Something went wrong. ');
      res.end('{ code: -1 }');
    } catch (e) {
      logger.error(e);
    }
  });
};

module.exports = initProxy;
