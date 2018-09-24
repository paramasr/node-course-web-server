const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname +'/public'));

app.use( (req, res, next) => {
	var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	
	fs.appendFile('server.log', log + '\r\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log')
		}
	});
	next();
});

app.use( (req, res, next) => {
	res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});


app.get('/', (request, response) => {
	//response.send('<h1>Hello Express!</h1>');
	response.render('Home.hbs', {
		title: 'Home Page',
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my first webpage!'
	});
});
app.get('/about', (request, response) => {
	response.render('About.hbs', {
		title: 'About Page',
		pageTitle: 'About Page'
	});
})
app.get('/bad', (request, response) => {
	response.send({
		error: 'function failed',
		code: 'info'
	});
})
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});