/**
 * Created by ggisbert on 7/10/15.
 */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlEncode = bodyParser.urlencoded({ extended : false});

app.use(express.static(__dirname + '/public'));



//redis connection
var redis = require('redis');

if (process.env.REDISTOGO_URL){
    var rtg = require("url").parse(process.env.REDISTOGO_URL);
    client = redis.createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(":")[1]);

}else{
    client = redis.createClient();
    client.select((process.env.NODE_ENV || 'development').length);

}

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

app.delete('/tasks/:name', urlEncode, function(request, response){

    client.hdel('tasks', request.params.name, function(error){
        if (error) throw error;
        response.sendStatus(204);
    })
});

module.exports = app;