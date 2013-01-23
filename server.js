var Server = function() {

    //  Check for NODE_ENV environment variable or set a sensible default.
    var NODE_ENV = process.env.NODE_ENV || "development";

    //  Set up module dependencies.
    var _ = require('lodash'),
        config = require('./app/config/config'),
        restify = require('restify'),  
        mongoose = require('mongoose'),
        db = mongoose.connect(config.mongoose[NODE_ENV].connectionString),
        notesController = require("./app/controllers/notes");

    //  Create, pre-configure and return an instance of a Restify application.
    //  Accepts an _options_ object that will be passed directly to the restify.createServer() method.
    var createServer = function (options) {
        //  Create instance of Restify application.
        var app = restify.createServer(options);

        //  restify.bodyParser() middleware.
        app.use(restify.bodyParser());

        //  Cross-origin resource management middleware.  
        app.pre(function (req, res, next) {
            //  Configure headers
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
            
            // Intercept the OPTIONS method.
            if ('OPTIONS' == req.method) {
              res.send(200);
            } else {
              next();
            }

        });    

        //  Configure Routes.
        app.get('/notes/:id', notesController.get);
        app.get('/notes', notesController.get);
        app.post('/notes', notesController.post);
        app.put('/notes/:id', notesController.put);    
        app.del('/notes/:id', notesController.del);

        //  Return application instance.
        return app;
    }

    //  Initialise and pre-configure a restify server instance.
    var server = createServer({
        'name': config.name
    });

    //  Return a facade.
    return {
        start: function() {
            // Start server listening on specified port.
            server.listen(config.port, function(req, res) {
                if (NODE_ENV === 'development') {
                    console.log('%s listening at %s', server.name, server.url);    
                } 
            });        
        },
        stop: function() {
            server.close();
        }
    }

}();

module.exports = exports = Server;