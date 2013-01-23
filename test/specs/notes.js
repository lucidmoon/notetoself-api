// init the test client
require("../test_helper.js");
var NotesController = require("../../core/controllers/notes.js");

describe("Notes", function() {
    beforeEach(function(done) {
    NotesController.create({
        "selectionText": "this",
        "srcUrl": "",
        "linkUrl": "",
        "pageUrl": "http://stackoverflow.com/questions/10587897/backbone-js-model-destroy-not-sending-delete-request",
        "dateCreated": "2013-01-10T22:39:40.104Z",
        "context": "context-selection",
        "title": "php - Backbone.js model.destroy() not sending DELETE request - Stack Overflow",
        "_id": "50ef432cb763ec4b5f000003",
        "__v": 0
        }, function() {
            done();
        });
    });

    afterEach(function(done) {
        NotesController.model.remove({}, function () {
            done();
        })
    });

    describe('GET: /notes', function() {
        it('responds with a 200', function(done) {
            client.get('/notes', function(err, req, res, data) {
                res.statusCode.should.eq(200);
                done();      
            });
        });

        it('responds with the correct dataset', function(done) {
            client.get('/notes', function(err, req, res, data) {
                data.should.exist;
                data.length.should.eq(1);
                data[0].title.should.eq("php - Backbone.js model.destroy() not sending DELETE request - Stack Overflow");
                done();
            });
        });

    });

    describe('GET: /notes/:id', function() {
        it('responds with a 200 if note exists', function(done) {
            client.get('/notes/50ef432cb763ec4b5f000003', function(err, req, res, data) {
                if (err) {
                    throw new Error(err);
                }
                else {
                    if (res.statusCode != 200) {
                        throw new Error('invalid response from /notes');
                    }
                       
                }
                done();      
            });
        });

        it('responds with correct dataset', function(done) {
            client.get('/notes/50ef432cb763ec4b5f000003', function(err, req, res, data) {
                data.should.exist;
                data.length.should.eq(1);
                data[0].title.should.eq("php - Backbone.js model.destroy() not sending DELETE request - Stack Overflow");
                done();
            });
        });

        it('responds with a 404 if note not found', function(done) {
            client.get('/notes/123456789', function(err, req, res, data) {
                res.statusCode.should.eq(404);
                done();      
            });
        });        
    });

    describe('PUT: /notes/:id', function() {
        it('updates note with correct data');
    });

    describe('DELETE: /notes/:id', function() {
        it('removes note from datastore');
    });

})
