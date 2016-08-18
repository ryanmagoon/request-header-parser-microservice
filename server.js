'use strict';

let express = require('express');
let path = require('path');

// create the server
let app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/whoami', function(req, res) {
    let headers = req.headers;
    let userAgent = headers['user-agent'];
    let ip = req.connection.remoteAddress;
    let language = headers['accept-language'].split(',')[0];
    let softwareDirty = userAgent.match(/\([;\w\s]+\)/)[0];
    res.send({
        ipaddress: ip.match(/:[\d.]+/)[0],
        language: language,
        software: softwareDirty.substr(1, softwareDirty.length - 2)
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log('app started!');
});