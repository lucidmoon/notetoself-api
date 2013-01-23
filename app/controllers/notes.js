//     NoteToSelf API 
//     (c) 2012-2013 Matt Richards, Lucidmoon Ltd
//     http://lucidmoon.co.uk
//     -----

//  Notes Controller.
var Notes = function () {

    //  Note model module dependency.     
    var Note = require('../../core/models/note');

    // GET route handler.
    function _get (req, res, next) {
        if (req.params.id) {
            Note.findOne({'_id':req.params.id}).execFind(function (arr, data) {
                if (data) {
                    res.send(data);
                } else {
                    res.send(404);
                }
            });
            return;
        } else {
            Note.find().sort('-dateCreated').execFind(function (arr,data) {
                res.send(data);
            });
        }        
    };

    // POST route handler.
    function _post (req, res, next) {
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
    };

    // PUT route handler.
    function _put (req, res, next) {
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
    };

    // DELETE route handler.
    function _del (req, res, next) {
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
    };

    // Return a facade.
    return {
        "get": _get,
        "post": _post,
        "put": _put,
        "del": _del
    }
}();

module.exports = exports = Notes;