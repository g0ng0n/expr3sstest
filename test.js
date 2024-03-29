/**
 * Created by ggisbert on 7/10/15.
 */
var request = require('supertest');
var app = require('./app');

var redis = require('redis');
var client = redis.createClient();

//specify our test db..
client.select('test'.length);
client.flushdb();

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
            .expect(JSON.stringify([]),done);
    })
});


describe('Creating Tasks on /tasks', function () {

    it('Returns 201 status code', function (done) {

        request(app)
            .post('/tasks')
            .send('name=LavaraLeo&description=dejarlolimpeoo')
            .expect(201,done);
    });

    it('Returns the task name', function(done){
        request(app)
            .post('/tasks')
            .send('name=LavaraLeo&&description=dejarlolimpeoo')
            .expect(/LavarALeo/i,done);
    });

    it('Validates Task name and descripttion', function(done){

        request(app)
            .post('/tasks')
            .send('name=&description=')
            .expect(400, done);
    })
});


describe('Deleting Tasks on /tasks', function () {

    before(function(){
        client.hset('tasks','banana','limpiarla');

    });

    after(function(){
        client.flushdb();
    });



    it('Returns 204 status code', function (done) {

        request(app)
            .delete('/tasks/Banana')
            .expect(204,done);
    });

});

describe('Shows a task info on /tasks/:name', function(){


    before(function(){
        client.hset('tasks','banana','limpiarla');

    });

    after(function(){
        client.flushdb();
    });

   it('Returns 200', function(done){

       request(app)
           .get('/tasks/banana')
           .expect(200, done);
   });

    it('Returns HTML Format', function(done){

        request(app)
            .get('/tasks/banana')
            .expect('Content-Type', /html/,done);
    });

    it('Returns information for given task', function(done){

        request(app)
            .get('/tasks/banana')
            .expect(/limpiarla/,done);
    });
});