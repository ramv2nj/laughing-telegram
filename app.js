// JavaScript source code
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;   

if(process.env.ENV == 'Test')
	db = mongoose.connect('mongodb://localhost/bookAPI_test');
else{
	db = mongoose.connect('mongodb://localhost/laughtelegram');
}

var Book = require('./models/bookModel');

var app = express();

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

bookRouter = require('./Routes/bookRoutes')(Book);
app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);



app.get('/', function (req, res) {
    res.send('welcome');
});

app.listen(port,function(){
    console.log('listening for port ' + port);
});

module.exports = app;
