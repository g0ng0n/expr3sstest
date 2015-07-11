/**
 * Created by ggisbert on 7/10/15.
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
var tasks = require('./routes/tasks');
app.use('/tasks', tasks);

module.exports = app;