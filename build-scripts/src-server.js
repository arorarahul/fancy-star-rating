var express = require('express');
var path = require('path');
var open = require('open');

var app = express();
var port = 3000;

app.use(express.static(path.join(__dirname, '../src')))

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../src/index.html'));
});

app.listen(port, function(err) {
    if(err){
        console.log(err);
    }else{
        open('http://localhost:' + port);
    }
})