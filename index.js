var _ = require('lodash');
var Promise = require('bluebird');
var java = require('java');
var restify = require('restify');
Promise.promisifyAll(java);

var setupGlobalOptions = function() {
  java.options.push('-Xmx4g');
  java.classpath.push('./java-lib/stanford-corenlp-3.5.2.jar');
  java.classpath.push('./java-lib/stanford-corenlp-3.5.2-models.jar');
  java.classpath.push('./java-lib/xom.jar');
};

setupGlobalOptions();

var pipeline = java.newInstanceAsync('java.util.Properties')
.then(Promise.promisifyAll)
.then(function(properties) {
  return properties.setPropertyAsync('annotators', 'tokenize,ssplit,pos')
  .then(function() {
    return java.newInstanceAsync('edu.stanford.nlp.pipeline.StanfordCoreNLP', properties)
    .then(Promise.promisifyAll);
  });
});

var processText = function(text) {
  text = 'How is the day today.';
  return java.newInstanceAsync('java.io.StringWriter')
  .then(Promise.promisifyAll)
  .then(function(stringWriter) {
    return pipeline
    .then(function(pipeline) {
      return pipeline.processAsync(text)
      .then(function(annotation) {
        return pipeline.jsonPrintAsync(annotation, stringWriter);
      })
      .then(function() {
        return stringWriter.toStringAsync();
      })
      .then(JSON.parse)
      .then(function(result) {
        return _.map(result.sentences[0].tokens, function(i) {
          return [i.word, i.pos, [i.characterOffsetBegin, i.characterOffsetEnd]];
        });
      });
    });
  });
};

var server = restify.createServer({
  name: 'CoreNLP Server',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser());

server.post('/parse', function(req, res, next) {
  if (typeof(req.params.text) !== 'string') {
    res.send({
      error: 'unrecognized format'
    });
  } else {
    processText(req.params.text)
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
