var express = require("express"),
	multer = require("multer");

var app = express();
var upload = multer({ storage: multer.memoryStorage() });

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

var image = null;
var content = null;

app.get('/', function(req, res) {
	// form to add new
	res.render('index', { showImage: image !== null });
});

app.post('/create', upload.single('file1'), function(req, res) {
	// added new
	if (req.file) {
		image = req.file.buffer;
		content = req.file.mimetype;
	} else {
		image = null;
	}
	res.redirect("/");
});

app.get('/image', function(req, res) {
	res.type(content);
	res.send(image);
});

app.listen(3000);
