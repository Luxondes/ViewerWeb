const express = require('express');
const { listen } = require('express/lib/application');

const app = express();

app.get('/', function(req, res){
    res.send('Hello World');
});

app.get('/:id', function(req, res){
    const id = req.params.id;
    res.send('Hello Human n°' + id);
});

app.listen(9000, function(req, res){
    console.log('Running...');
});