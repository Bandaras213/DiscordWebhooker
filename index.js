const express = require('express');
const app = express();
const path = require('path');
const moment = require("moment");
const meme = require('./get.js');
const test = require('./testing.js');

app.use(express.static(path.join(__dirname, 'html')));

app.get('/ping', function(req, res) {
	console.log("Ping received on: " + new Date()),
		res.sendStatus(200)
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getmeme', function(req, res) {
  meme.getmeme();
	res.sendStatus(200);
});

app.get('/music', function(req, res) {
  meme.getmeme();
	res.sendStatus(200);
});

app.get('/test', function(req, res) {
  test.go();
	res.sendStatus(200);
});

let serverlistener = app.listen(3000, function() {
	console.log("App server is running on port 3000");
	console.log("Started at: " + moment().format('DD/MM/YYYY, h:mm:ss a'));
	console.log("to end press Ctrl + C");
});