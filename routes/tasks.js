/**
 * Created by ggisbert on 7/11/15.
 */

var express = require('express');

var bodyParser = require('body-parser');
var urlEncode = bodyParser.urlencoded({ extended : false});



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

var router = express.Router();

client.hset('tasks','Lavar a Leo', 'dejarlo limpeoo');
client.hset('tasks','codear', 'toddysss');

router.route('/')
    .get(function(request, response){
        client.hkeys('tasks',function(error, names){
            if(error) throw error;
            response.json(names);
        });
    })
    .post(urlEncode, function(request, response){
        var newTask = request.body;
        if(!newTask.name || !newTask.description){
            response.sendStatus(400);
            return false;
        }
        client.hset('tasks', newTask.name, newTask.description, function(error){
            if(error) throw error;
            response.status(201).json(newTask.name);

        });
    });
router.route('/:name')
    .get(function(request, response){
        client.hget('tasks',  request.params.name, function(error, description){
            if(error) throw error;
            response.render('show.ejs',{task:
            {name : request.params.name, description: description }
            });
        });
    })
    .delete(urlEncode, function(request, response){

        client.hdel('tasks', request.params.name, function(error){
            if (error) throw error;
            response.sendStatus(204);
        })
    });

module.exports = router;