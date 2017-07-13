var express = require('express');
var unirest = require('unirest');
var events = require('events');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
//var activity = require('./models/activity');



var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());


//
//var runServer = function (callback) {
//    mongoose.connect(config.DATABASE_URL, function (err) {
//        if (err && callback) {
//            return callback(err);
//        }
//
//        app.listen(config.PORT, function () {
//            console.log('Listening on localhost:' + config.PORT);
//            if (callback) {
//                callback();
//            }
//        });
//    });
//};
//
//if (require.main === module) {
//    runServer(function (err) {
//        if (err) {
//            console.error(err);
//        }
//    });
//};
//
// external API call
var getFromNps = function (location) {
    var emitter = new events.EventEmitter();
    unirest.get("https://developer.nps.gov/api/v0/alerts?parkCode=yell,yose")
//        .header("Accept", "application/json")
        .header("Authorization", "EF26EC69-4C03-458F-9AD7-C33903A87CAB")
        .end(function (result) {
        //success scenario
        if (result.ok) {
            emitter.emit('end', result.body);
        }
        //failure scenario
        else {
            emitter.emit('error', result.code);
        }
    });

    return emitter;
};



//
// local API endpoints


//
app.get('/activity/:location', function (req, res) {


    //external api function call and response
    var searchReq = getFromNps(req.params.location);

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
//app.post('/add-to-favorites/', function (req, res) {
//
//    //db connection and data queries
//    activity.create({
//        name: req.body.name,
//        date: req.body.date,
//        place: req.body.place,
//        url: req.body.url
//    }, function (err, item) {
//        if (err) {
//            return res.status(500).json({
//                message: 'Internal Server Error'
//            });
//        }
//        res.status(201).json(item);
//    });
//});
//
//app.get('/populate-favorites', function (req, res) {
//    activity.find(function (err, item) {
//        if (err) {
//            return res.status(500).json({
//                message: 'Internal Server Error'
//            });
//        }
//        res.status(200).json(item);
//    });
//});

//app.delete('/delete-favorites/:favoritesId', function (req, res) {
//    activity.findByIdAndRemove(req.params.favoritesId, function (err, items) {
//        if (err)
//            return res.status(404).json({
//                message: 'Item not found.'
//            });
//
//        res.status(201).json(items);
//    });
//});


exports.app = app;
//exports.runServer = runServer;


// listen for requests
app.listen(process.env.PORT || 8080, function() { return console.log('Your app is listening on port ' + (process.env.PORT || 8080));
                                                });

//app.listen(3002);
