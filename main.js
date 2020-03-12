var http = require('http');                 
var url = require('url');      
var topic = require('./lib/topic'); 
var author = require('./lib/author');

/*
var qs = require('querystring');  
var template = require('./lib/template.js');
var db = require('./lib/db');     // get datebase
*/

var app = http.createServer(                          // 웹페이지를 reload할 때마다 request로  요청정보가 넘어온다. 
  function(request,response){
    var _url = request.url;                           // result : /
    var queryData = url.parse(_url, true).query;      // result : [Object: null prototype] {} - querysting으로 웹페이지를 구분하는 구분자 역할을 할 것
    var pathname = url.parse(_url, true).pathname;    // result : /

    if(pathname === '/') {
        if(queryData.id === undefined){
            // home
            topic.home(request,response);
        } else {       
            topic.page(request,response);
        }
    } else if(pathname === '/create'){
        topic.create(request, response);
    } else if(pathname === '/create_process'){
        topic.create_process(request, response);
    } else if(pathname === '/update'){
        topic.update(request, response);
    } else if(pathname === '/update_process'){
        topic.update_prcoess(request, response);
    } else if(pathname === '/delete_process'){
        topic.delete_process(request, response);
    } else if(pathname === '/author') {
        author.home(request, response);
    } else if(pathname === '/author/create_process') {
        author.create_process(request, response);
    } else if(pathname === '/author/update') {
        author.update(request, response);
    } else if(pathname === '/author/update_process') {
        author.update_process(request, response);
    } else if(pathname === '/author/delete_process') {
        author.delete_process(request, response);
    } else {
    response.writeHead(404);
    response.end('Not found');
    }
});
app.listen(3000);

