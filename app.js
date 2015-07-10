/**
 * Created by ggisbert on 7/10/15.
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));


app.get('/tasks',function(request, response){
    var tasks = ['Lavar a Leo','Codear'];
    response.json(tasks);
});



module.exports = app;