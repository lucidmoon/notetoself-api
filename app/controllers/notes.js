var Note = require('../models/note');

var controller = {
    // GET: /notes/:id
    "get": function (req, res, next) {
        if (req.params.id) {
            Note.findOne({'_id':req.params.id}).execFind(function (arr, data) {
                res.send(data);
            });
            return;
        } else {
            Note.find().sort('-dateCreated').execFind(function (arr,data) {
                res.send(data);
            });
        }        
    },

    // POST: /notes
    "post": function (req, res, next) {
        var note = new Note();
        note.title = req.params.title;
        note.context = req.params.context;
        note.dateCreated = req.params.dateCreated;  
        note.pageUrl = req.params.pageUrl || '';
        note.linkUrl = req.params.linkUrl || '';
        note.srcUrl = req.params.srcUrl || '';
        note.selectionText = req.params.selectionText || '';

        note.save(function () {
            res.send(req.body);
        });
    },

    // PUT: /notes/:id
    "put": function (req, res, next) {
        Note.findOne({'_id':req.params.id}).execFind(function (arr, model) {
            model.title = req.params.title;
            model.context = req.params.context;
            model.dateCreated = req.params.dateCreated;  
            model.pageUrl = req.params.pageUrl || '';
            model.linkUrl = req.params.linkUrl || '';
            model.srcUrl = req.params.srcUrl || '';
            model.selectionText = req.params.selectionText || '';

            model.save(function () {
                res.send(req.body);
            });
        });
    },

    // DELETE: /notes/:id
    "del": function (req, res, next) {
        if (req.param('id')) {
            console.log(req.param('id'));
            Note.remove(req.param('id'), function (err) {
                if (err) return handleError(err);
                res.send(204);
                return next();
            });
        } else {
            res.send(501);
        }
    }
};

module.exports = exports = controller;