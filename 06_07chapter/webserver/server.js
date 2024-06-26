/*
 * @Description: 
 * @Autor: sy
 * @Date: 2022-07-08 08:28:12
 * @LastEditors: sy
 * @LastEditTime: 2024-06-25 15:37:53
 */
'use strict'

var http = require('http');
var https = require('https');
var fs = require('fs');

var serveIndex = require('serve-index');

var express = require('express');
var app = express();

//顺序不能换
app.use(serveIndex('./public'));
app.use(express.static('./public'));

var options = {
	key  : fs.readFileSync('./cert/1557605_www.learningrtc.cn.key'),
	cert : fs.readFileSync('./cert/1557605_www.learningrtc.cn.pem') 
}

var https_server = https.createServer(options, app);
https_server.listen(444, '0.0.0.0');

var http_server = http.createServer(app);
http_server.listen(80, '0.0.0.0');


