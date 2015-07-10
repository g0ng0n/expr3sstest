/**
 * Created by ggisbert on 7/10/15.
 */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlEncode = bodyParser.urlencoded({ extended : false});


app.use(express.static(__dirname + '/public'));

var tasks= {
    'Lavar a Leo' : '',
    'Codear' : 'magea'
};

app.get('/tasks',function(request, response){
    response.json(Object.keys(tasks));
});

app.post('/tasks', urlEncode, function(request, response){
    var newTask = request.body;
    tasks[newTask.name] = newTask.description;
    response.status(201).json(newTask.name);
});


module.exports = app;