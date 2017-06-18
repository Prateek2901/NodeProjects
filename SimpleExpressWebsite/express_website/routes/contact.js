var express = require('express');
var nodemailer = require('nodemailer');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact ' });
});

router.post('/send',function(req,res,next)
{
	var transporter = nodemailer.createTransport(
	{
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth:
		{
			user: 'pratik9044536615@gmail.com',
			password: '7837771731'
		}
	});

	var mailOptions = {
		from: 'Prateek <prateek@gmail.com>',
		to : 'Sahaj <sahaj@gmail.com>',
		subject: 'Website Submission',
		text: 'You have new Submission with following details...Name: '+req.body.name+' Email:'+req.body.email+' Message:'+req.body.message,		
		html: '<p>You got a new Submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li> Email:'+req.body.email+'</li><li> Message:'+req.body.message+'</li></ul>'
	};
	transporter.sendMail(mailOptions,
		function(err,info)
		{
			if(err)
			{
				console.log(err);
				res.redirect('/');
			}else
			{
				console.log('Message Sent'+info.res);
				res.redirect('/');
			}
		}); 
});

module.exports = router;
