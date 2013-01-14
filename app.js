var _ = require('lodash'),
	config = require('./app/config/config'),
	restify = require('restify'),  
	mongoose = require('mongoose'),
	db = mongoose.connect(config.credentials.mongoose_auth),
	notesController = require("./app/controllers/notes");


var createServer = function (options) {
    var app = restify.createServer(options);
    var allowCrossDomain = function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        
        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
          res.send(200);
        }
        else {
          next();
        }
    };

    app.use(restify.bodyParser());
    app.pre(allowCrossDomain);    
    app.get('/notes/:id', notesController.get);
    app.get('/notes', notesController.get);
    app.post('/notes', notesController.post);
    app.put('/notes/:id', notesController.put);    
    app.del('/notes/:id', notesController.del);

    return app;
}

var server = createServer({
	'name': config.app.name
});

server.listen(config.app.port, function(req, res) {
	console.log('%s listening at %s', server.name, server.url);
});