/**
 * Created by ggisbert on 7/10/15.
 */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlEncode = bodyParser.urlencoded({ extended : false});


app.use(express.static(__dirname + '/public'));

var redis = require('redis');
var client = redis.createClient();


client.select((process.env.NODE_ENV || 'development').length);


client.hset('tasks','Lavar a Leo', 'dejarlo limpeoo');
client.hset('tasks','codear', 'toddysss');

app.get('/tasks',function(request, response){
    client.hkeys('tasks',function(error, names){
        if(error) throw error;
        response.json(names);
    });
});

app.post('/tasks', urlEncode, function(request, response){
    var newTask = request.body;
    client.hset('tasks', newTask.name, newTask.description, function(error){
       if(error) throw error;

        response.status(201).json(newTask.name);

    });
});


module.exports = app;