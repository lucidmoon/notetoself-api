//     NoteToSelf API 
//     (c) 2012-2013 Matt Richards, Lucidmoon Ltd
//     http://lucidmoon.co.uk
//     -----

//  Application config.
var Config = function () {
    return {
        name: "NoteToSelf API",
        port: "3030",
        mongoose: {
            development: {
                connectionString: 'mongodb://127.0.0.1/notetoself'  
            },
            testing: {
                connectionString: 'mongodb://127.0.0.1/notetoself-testing'  
            },
            production: {
                connectionString: 'mongodb://127.0.0.1/notetoself-production'   
            }               
        }
    }
}();

exports.module = exports = Config;