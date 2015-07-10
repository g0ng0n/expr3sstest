/**
 * Created by ggisbert on 7/10/15.
 */
var express = require('express');
var app = express();


app.get('/',function(request, response){
   response.send('OK');
});


app.listen(3000);