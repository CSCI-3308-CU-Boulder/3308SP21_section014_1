var express = require('express'); 
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
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

app.use(session({
    key: 'user_sid',
    secret: 'defenders',
    resave: false,
    saveUninitialized: false,
    cookie: {
		maxAge: 1000 * 60 * 30,
		secure: false
    }
}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

// registration page
app.get('/', function(req, res) {
	res.render('registration',{
		my_title:"Registration Page",
		message: '',
		success: false,
		loginTab: true
	});
});

app.post('/', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	var createUsername = req.body.createUsername;
	var createPassword = req.body.createPassword;

	var insert_statement = "insert into users (username, pw) values ('" + createUsername + "', '" + createPassword + "');"; 
	var username_available = "select count(*) from users where username='" + createUsername + "';";
	var login_check = "select * from users where username='" + username + "';"

	if (username) {
		db.task('get-everything', task => {
			return task.batch([
				task.any(login_check)
			]);
		})
		.then(info => {
			if (info[0][0] && info[0][0].pw == password) {
				res.render('registration',{
					my_title: "Registration Page",
					message: "Login successful!",
					success: true,
					loginTab: true
				});
				req.session.user = info[0][0].user_id;
				console.log(req.session.id);
			} else {
				res.render('registration',{
					my_title: "Registration Page",
					message: "Incorrect username or password",
					success: false,
					loginTab: true
				})
			}
		})
		.catch(err => {
			console.log('error', err);
			res.render('registration', {
				my_title: 'Registration Page',
				message: '',
				success: false,
				loginTab: true
			})
		});
	} else {
		db.task('get-everything', task => {
			return task.batch([
				task.any(username_available)
			]);
		})
		.then(info => {
			if (info[0][0].count == 0) {
				res.render('registration',{
					my_title: "Registration Page",
					message: "Account created successfully!",
					success: true,
					loginTab: false
				})
				db.task('get-everything', task => {
					return task.batch([
						task.any(insert_statement)
					])
				})
			} else {
				res.render('registration',{
					my_title: "Registration Page",
					message: "This username has been taken",
					success: false,
					loginTab: false
				})
			}
		})
		.catch(err => {
			console.log('error', err);
			res.render('registration', {
				my_title: 'Registration Page',
				message: '',
				success: false,
				loginTab: false
			})
		});
	}
});

app.get('/home', function(req, res) {
	console.log(req.session.id);
	// if (req.session && req.session.user) {
		res.render('index',{
			my_title:"Home Page"
		});
	// } else {
		console.log("redirected");
		res.redirect('/');
	// }
});

app.get('/about', function(req, res) {
	res.render('about',{
		my_title:"About Page"
	});
});

app.get('/scoredb', function(req, res) {
	var scores = "select * from scores;";

	db.task('get-everything', task => {
		return task.batch([
			task.any(scores)
		]);
	})
	.then(info => {
		res.send(info[0]);
	})
});

app.listen(3001);
console.log('hosted on port 3001');
