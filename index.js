var Promise = require('bluebird');
var restify = require('restify');
var lib = require('./lib.js');
var utils = require('./utils');

var logger = utils.logging.newConsoleLogger('server');

var server = restify.createServer({
  name: 'CoreNLP Server',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser());

server.post('/parse', function(req, res, next) {
  logger.info('request with params', req.params);
  if (typeof(req.params.text) !== 'string') {
    res.send(400, {
      error: 'unrecognized format'
    });
  } else {
    lib.processText(req.params.text)
    .then(function(result) {
      res.send({
        result: result
      });
      next();
    });
  }
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

