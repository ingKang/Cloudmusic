const http = require('http');
const express = require('express');
const user = require('./router/control');

var app = express();
app.disable('x-powered-by');
var server = http.createServer(app);
server.listen(3000);

app.use(express.static('./public'));
app.use('/user', user)