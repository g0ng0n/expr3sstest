/**
 * Created by ggisbert on 7/10/15.
 */
var request = require('supertest');
var app = require('./app');

describe('Request to the root path', function () {
    it('Returns a 200 status code', function (done) {

        request(app)
            .get('/')
            .expect(200,done);
    });

    it('Returns a HTML format', function(done){

        request(app)
            .get('/')
            .expect('Content-Type',/html/,done);

    })

    it('Returns an index file with tasks',function(done){

        request(app)
            .get('/')
            .expect(/tasks/i, done);
    })
});

describe('Listing tasks on /tasks', function () {
    it('Returns 200 status code', function (done) {

        request(app)
            .get('/tasks')
            .expect(200,done);
    });

    it('Returns JSON format', function(done){
        request(app)
            .get('/tasks')
            .expect('Content-Type', /json/,done);
    })

    it('Returns initial tasks',function(done){

        request(app)
            .get('/tasks')
            .expect(JSON.stringify(['Lavar a Leo','Codear']),done);

    })
});


describe('Creating Tasks on /tasks', function () {
    it('Returns 201 status code', function (done) {

        request(app)
            .post('/tasks')
            .send('name=LavarALeo&limpiarlotodyto')
            .expect(201,done);
    });

    it('Return the task name', function(done){
        request(app)
            .post('/tasks')
            .send('name=LavaraLeo&limpiarlotodyto')
            .expect(/LavarALeo/i,done);
    })
});
