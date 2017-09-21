global.DATABASE_URL = 'mongodb://admin:password@ds155192.mlab.com:55192/national-parks-final-capstone'

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

const {
    app, runServer, closeServer
} = require('../server');

var server = require('../server.js');
var Park = require('../models/park.js');

describe('nps-api-national-parks', function () {
    before(function (done) {
        server.runServer(function () {
            Park.create({
                name: 'Yellowstone National Park'
            }, {
                name: 'Denali National Park'
            }, function () {
                done();
            });
        });
    });

    describe(Park, function () {
        it('should list parks on GET', function (done) {
            chai.request(app)
                .get('/park/:parkCode')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
        });
        it('should add a park on POST', function (done) {
            chai.request(app)
                .post('/add-to-bucket-list/')
                .send({
                    'name': 'Park'
                })
                .end(function (err, res) {
                    should.equal(err, null);
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('_id');
                    res.body.name.should.be.a('string');
                    res.body._id.should.be.a('string');
                    res.body.name.should.equal('Park');
                    done();
                });
        });
        it('should delete an item on DELETE', function (done) {
            chai.request(app)
                .delete('/')
                .end(function (err, res) {
                    res.should.have.status(404);
                    done();
                });
        });
    });
    after(function (done) {
        Park.remove(function () {
            done();
        });
    });
});
