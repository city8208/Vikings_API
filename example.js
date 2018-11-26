var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');
////this is a example for Nodejs Web POST/GET ///
var postHTML =
    '<html><head><meta charset="utf-8"><title>Node.js Post/Get Example</title></head>' +
    '<body>' +
    '<form method="post">' +
    'Show_POST(name)： <input name="name"><br>' +
    'Shwo_POST(url)： <input name="url"><br>' +
    '<input type="submit">' +
    '</form>' +
    '</body></html>';

http.createServer(function (req, res) {
    var body = "";
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        // check Url
        body = querystring.parse(body);
        // Set Body/Head string
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        //////////////GET
        var params = url.parse(req.url, true).query;
        res.write("Show_GET(name)：" + params.name);
        res.write("<br>");
        res.write("Show_GET(url)：" + params.url);
        res.write("<br>");
        /////////////POST
        if(body.name && body.url) { // 输出提交的数据
            res.write("Show_POST(name)：" + body.name);
            res.write("<br>");
            res.write("Show_POST(url)：" + body.url);
        } else {  // 输出表单
            res.write(postHTML);
        }
        res.end();
    });
}).listen(3000);