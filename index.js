var express = require('express');
var morgan  = require('morgan');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var http = require('http');


const PORT = 7000;
const HOST = 'localhost';
const TIMEOUT = 5000;

var app = express();
app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

var server = http.createServer(app);

function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve();
      }, time);
        
    });
}

function handle(req, res)  {
    console.log('Headers: ', req.headers);
    console.log('Cookies: ', req.cookies);
    sleep(TIMEOUT).then(()=> {
        res.send('_OK_');    
    })
}

app.get('/', function (req, res) {
  handle(req, res);
})

app.post('/', function (req, res) {
    handle(req, res);
})
  

server.listen(PORT, HOST);
server.on('listening', function() {
      console.log('Express server started on port %s at %s', server.address().port, server.address().address);
}); 
