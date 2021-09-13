let express = require('express');
let router = express.Router();
let hasher = require('string-hash');
let client = require('./client')

router.get('/', function (req, res) {
	res.locals.title = 'One-time Link Shortener';
	res.locals.result = null;
	res.render('index');
});

router.post('/', (req, res) => {
	let value = req.body.userInput;
	let key = hasher(value);

	console.log(key, value);

	client.hset(key, 'link', value);

	res.locals.title = 'One-time Link Shortener';
	res.locals.result = key;
	res.render('index');
});

router.get('/:key', (req, res) => {
	client.hgetall(req.params.key, (err, obj) => {
		if (!obj) {
			console.log('');
		}
		else {
			console.log(obj.link);
		}
		res.status(301).redirect(obj.link);
	});
})

module.exports = router;