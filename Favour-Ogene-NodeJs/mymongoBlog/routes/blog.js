var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var router = express.Router();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('We are connected');
});

//create template
var blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  date: String,
  content: String
});

var Blog = mongoose.model('Blog', blogSchema);

/* insert new blog entry */
router.post('/create', function(req, res, next) {
	var blog = new Blog(req.body);
	blog.save(function(err, result) {	
		if (err) return console.error(err);
		res.status(201).send(result);
	});
});

/* view a blog entry */
router.get('/read/:id', function(req, res, next) {
	Blog.findById(req.params.id, function(err, result) {
		if (err) return console.error(err);
	    	res.status(201).send(result);
	});
});


/* view all blog entries */
router.get('/read', function(req, res, next) {
	Blog.find(function(err, blogs) {
		if (err) return console.error(err);
		res.status(201).send(blogs);
	});
});

/* update a blog entry */
router.put('/update/:id', function(req, res, next) {
    	Blog.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
        	if (err) return console.error(err);
        	res.send('Article successfully udpated.');
    	});
});

/* delete a blog entry */
router.delete('/delete/:id', function(req, res, next) {
	Blog.findByIdAndRemove(req.params.id, function (err) {
    		if (err) return console.error(err);
    		res.status(201).send("Article successfully deleted.");
	});
});

module.exports = router;