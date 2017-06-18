// Required Modules

const http = require('http'); // for handling HTTP request
const url = require('url'); // for url support
const path = require('path'); 
const fs = require('fs'); //file system


//Array of extension Files
var mimeTypes ={
	"html" : "text/html",
	"jpeg" : "image/jpeg",
	"jpg" : "image/jpeg",
	"png" : "image/png",
	"js" : "text/javascript",
	"css" : "text/css"
};

http.createServer(function(req,res)
{
	var uri = url.parse(req.url).pathname;
	// "cwd" => current working dir
	// "unescape(uri)" to save from escape characters
	var fileName = path.join(process.cwd(),unescape(uri));
	console.log('Loading '+uri);
	var stats;
	try
	{
		//look for file name if present else go to "catch"
		stats = fs.lstatSync(fileName);
	}
	catch(e)
	{
		// to be displayed when file not found
		res.writeHead(404,{'Content-type':"text/plain"});
		res.write('404 Not Found\n');
		res.end();
		return;
	}
	// check if file/dir
	if(stats.isFile())
	{
		var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
		res.writeHead(200,{'Content-type':mimeType});
		var fileStream = fs.createReadStream(fileName);
		fileStream.pipe(res);
	}
	else if(stats.isDirectory())
	{
		//if dir re-direct to the "index.html"
		res.writeHead(302,{
			'location':'main.html'
		});
		res.end();
	}
	else
	{
		res.writeHead(500,{'Content-type':'text/plain'});
		res.write('500 Internal Error');
		res.end();	
	}

}).listen(3000);