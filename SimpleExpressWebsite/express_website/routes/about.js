var express = require('express');
var router = express.Router();

/* GET home page. */

/*

router.get('/', function(req, res, next)

and not

router.get('/about', function(req, res, next)

if it was in index.js then we were to use /about
becoz its the root of about.js
*/
router.get('/', function(req, res, next) {
  res.render('about', { title: 'About ' });
});

module.exports = router;
