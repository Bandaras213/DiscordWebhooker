const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const path = require('path');
const moment = require("moment");
const controller = require('./controller/controller.js');
const tests = require('./tests/tests.js');

// Setting up local path and bodyparser
app.use(express.static(path.join(__dirname, 'html')));
app.use(bodyParser.urlencoded({
	extended: true
}))
// ================================================== //

// Ping function
app.post('/ping', function (req, res) {
	console.log("Ping received on: " + new Date()),
		res.sendStatus(200)
});
// ================================================== //

// Default Page
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});
// ================================================== //

// Test Site
app.get('/tests', function (req, res) {
	res.sendFile(path.join(__dirname, 'html/tests/tests.html'));
});
// ================================================== //

// Post redirect for Memes
app.post('/POSTS/meme', function (req, res) {
	controller.meme();
	res.sendStatus(200);
});
// ================================================== //

// Post redirect for Music
app.post('/POSTS/music', function (req, res) {
	controller.music();
	res.sendStatus(200);
});
// ================================================== //

// Test redirects
app.post('/tests/POSTS/test', async function (req, res) {
	let backres;
	switch (req.body.type) {
		case ("testReadDB"):
			backres = await tests.testReadDB();
			res.send({
				res: backres
			});
			break;
		case ("testWriteDB"):
			await tests.testWriteDB();
			res.send({
				res: `/download/test.json`
			});
			break;
		case ("addNewPlaylist"):
			controller.new(req.body.genre, req.body.id);
			res.sendStatus(200);
			break;
	}
});
// ================================================== //

// Download for tests.testWriteDB()
app.get('/download/test.json', async function (req, res) {
	const file = `${__dirname}/tests/test.json`;
	res.download(file, "test.json", function (err) {
		if (err) {
			console.log(err);
		}
		tests.testRemoveFile(file);
	});
});
// ================================================== //

// App Listener
app.listen(3000, function () {
	console.log("App server is running on port 3000");
	console.log("Started at: " + moment().format('DD/MM/YYYY, h:mm:ss a'));
	console.log("to end press Ctrl + C");
});
// ================================================== //