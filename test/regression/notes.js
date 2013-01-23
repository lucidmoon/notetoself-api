// init the test client
require("../test_helper.js");

describe('service: /notes', function() {
 
    // Test #1
    describe('GET:', function() {
        it('should get a 200 response', function(done) {
            client.get('/notes', function(err, req, res, data) {
                if (err) {
                    throw new Error(err);
                }
                else {
                    if (res.statusCode != 200) {
                        throw new Error('invalid response from /hello/world');
                    }
                    done();
                }
            });
        });
    });
    // Add more tests as needed...
});