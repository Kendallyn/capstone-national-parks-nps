var express = require('express');
var unirest = require('unirest');
var events = require('events');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var https = require('https');
var http = require('http');
var app = express();
var park = require('./models/park');
app.use(express.static('public'));
app.use(bodyParser.json());



var runServer = function (callback) {
    mongoose.connect(config.DATABASE_URL, function (err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function () {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function (err) {
        if (err) {
            console.error(err);
        }
    });
};


// external API call
var getFromNps = function (location) {
    var emitter = new events.EventEmitter();


    var options = {
        host: 'developer.nps.gov',
        path: '/api/v0/parks?parkCode=' + location,
        method: 'GET',
        headers: {
            'Authorization': "EF26EC69-4C03-458F-9AD7-C33903A87CAB",
            'Content-Type': "application/json",
            'Port': 443,
            'User-Agent': 'Paw/3.1.2 (Macintosh; OS X/10.12.5) GCDHTTPRequest'
        }
    };

    https.get(options, function (res) {
        //        console.log(res)
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
            //emitter.emit('end', body);
            //res.json(body);
            //var jsonFormattedResults = JSON.parse(body).data[0].description;
            var jsonFormattedResults = JSON.parse(body);
            //            console.log(jsonFormattedResults);
            emitter.emit('end', jsonFormattedResults);
            //var stringResult = JSON.parse(body);
            //eventCallback(stringResult);
        });

        //        res.on('end', function () {
        //            console.log("inside end");
        //            emitter.emit('end', body);
        //            //var stringResult = JSON.parse(body);
        //            //eventCallback(stringResult);
        //        });
    }).on('error', function (e) {

        emitter.emit('error', e);
    });
    return emitter;
};
// external API call from active api example
//var getFromNps = function (location) {
//    var emitter = new events.EventEmitter();
//    unirest.get("http://developer.nps.gov/api/v0/parks?parkCode=")
//        .header("Accept", "application/json")
//        .end(function (result) {
//            //success scenario
//            if (result.ok) {
//                emitter.emit('end', result.body);
//            }
//            //failure scenario
//            else {
//                emitter.emit('error', result.code);
//            }
//        });
//
//    return emitter;
//};


// local API endpoints
app.get('/park/:parkCode', function (req, res) {


    //external api function call and response
    var searchReq = getFromNps(req.params.parkCode);

    //get the data from the first api call
    searchReq.on('end', function (item) {
        res.json(item);
    });

    //error handling
    searchReq.on('error', function (code) {
        res.sendStatus(code);
    });

});
//
app.post('/add-to-bucket-list/', function (req, res) {

    //db connection and data queries
    //creating object that will POST
    park.create({
        name: req.body.name,
        image: req.body.image
    }, function (err, item) {
        console.log(item);
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});
//
app.get('/populate-bucket-list/', function (req, res) {
    park.find(function (err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(item);
    });
});

app.delete('/delete-from-bucket-list/:bucketListId', function (req, res) {
    park.findByIdAndRemove(req.params.bucketListId, function (err, items) {
        if (err)
            return res.status(404).json({
                message: 'Item not found.'
            });

        res.status(201).json(items);
    });
});


exports.app = app;
//exports.runServer = runServer;


// listen for requests
app.listen(process.env.PORT || 8080, function () {
    return console.log('Your app is listening on port ' + (process.env.PORT || 8080));
});

//app.listen(3002);
