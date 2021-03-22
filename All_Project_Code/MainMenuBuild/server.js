var express = require('express'); 
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());          
app.use(bodyParser.urlencoded({ extended: true }));

var pgp = require('pg-promise')();

const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'TowerDefense_Data',
	user: 'postgres',
	password: 'defenders'
};

var db = pgp(dbConfig);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

// registration page
app.get('/', function(req, res) {
	res.render('registration',{
		my_title:"Registration Page"
	});
});

app.get('/home', function(req, res) {
	res.render('index',{
		my_title:"Home Page"
	});
});

app.get('/about', function(req, res) {
	res.render('about',{
		my_title:"About Page"
	});
});

app.listen(3000);
console.log('hosted on port 3000');
