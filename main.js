var http = require('http');       // get http moduel
var fs = require('fs');           // file system moduel
var url = require('url');         // get url moduel
 
var app = http.createServer(
  function(request,response){
    
    var _url = request.url;
    // analyze given 'url'
    var queryData = url.parse(_url, true).query; 
    var pathname = url.parse(_url, true).pathname;
    
    if(pathname === '/') {
      if(queryData.id === undefined){
        fs.readdir('./data', function(error, filelist) {
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          // var list = `<ul>
          //             <li><a href="/?id=HTML">HTML</a></li>
          //             <li><a href="/?id=CSS">CSS</a></li>
          //             <li><a href="/?id=JavaScript">JavaScript</a></li>
          //             </ul>`;
          // refactoring into below
          var list = '<ul>';
          var i = 0;
          while(i < filelist.length) {
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i++;
          }
          list = list + '</ul>';

          var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
          `;

          response.writeHead(200);
          response.end(template);
        });
        
        } else {       
          fs.readdir('./data', function(error, filelist) {
            var title = 'Welcome';
            var description = 'Hello, Node.js';

            // create list
            var list = '<ul>';
            var i = 0;
            while(i < filelist.length) {
              list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
              i++;
            }
            list = list + '</ul>'; 

          fs.readFile(`./data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id;
            var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
            response.writeHead(200);
            response.end(template);
           });
          });
        }
      } else {
        response.writeHead(404);
        response.end('Not found');
      }

    });
    app.listen(3000);