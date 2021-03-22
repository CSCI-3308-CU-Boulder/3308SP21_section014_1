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
	console.log(123);
	res.render('RegistrationSD',{
		my_title:"Registration Page"
	});
});

app.listen(3000);
console.log('hosted on port 3000');
