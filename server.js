var express = require("express"),
	util = require("util"),
	fs = require("fs");

var app = express.createServer();

app.use(express.bodyParser());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

var image = null;
var content = null;

app.get('/', function(req, res) {
	// form to add new
	res.render('index', { showImage: image !== null });
});

app.post('/create', function(req, res) {
	// added new
	var tempPath = req.files.file1.path;
	fs.readFile(tempPath, function(err, data) {
		if (err) {
			image = null;
		}
		image = data;
		content = req.files.file1.mime;
	});
	res.redirect("/");
});

app.get('/image', function(req, res) {
	res.contentType(content);
	res.send(image);
});

app.listen(3000);
