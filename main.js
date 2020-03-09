var http = require('http');       
var fs = require('fs');           
var url = require('url');      
var qs = require('querystring');  
var template = require('./lib/template.js');
var MySQL = require('mysql');

var db = MySQL.createConnection({
  host : 'localhost',
  user : 'root',
  password : '111111',
  database : 'opentutorials'
});


db.connect();

var app = http.createServer(                          // 웹페이지를 reload할 때마다 request로  요청정보가 넘어온다. 
  function(request,response){
    var _url = request.url;                           // result : /
    var queryData = url.parse(_url, true).query;      // result : [Object: null prototype] {} - querysting으로 웹페이지를 구분하는 구분자 역할을 할 것
    var pathname = url.parse(_url, true).pathname;    // result : /

      if(pathname === '/') {
        if(queryData.id === undefined){
          // home
          db.query(`SELECT * FROM topic`, function(error, topics) {
            if(error) {
              throw error;
            }

            const title = 'Welcome';
            const desc = 'Hello, World!';

            const list = template.list(topics);
            const html = template.html(title, list, 
              `<h2>${title}</h2><p>${desc}</p>`,
              `<a href="/create">create</a>`);

              response.writeHead(200);
              response.end(html);

          });
          } else {       
            // this page have queryData.id value
            db.query(`SELECT * FROM topic`, function(error, topics) {
              if(error) {
                throw error;
              }
              db.query(`
              SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id=?`, [queryData.id], function(error2, topic) {
                if(error2) {
                  throw error2;
                }
                  const title = topic[0].title;
                  const desc = topic[0].description;
                  const author = topic[0].name;

                  const list = template.list(topics);
                  const html = template.html(title, list,
                  `<h2>${title}</h2>
                  ${desc}
                  <p>by ${author}</p>`,
                  ` <a href="/create">create</a>
                    <a href="/update?id=${queryData.id}">update</a>

                    <form action="delete_process" method="post">
                      <input type="hidden" name="id" value="${queryData.id}">
                      <input type="submit" value="delete">
                    </form>`
                  );
                  response.writeHead(200);
                  response.end(html);
              });
            });
          }
      } else if(pathname === '/create'){
        db.query(`SELECT * FROM topic`, function(error, topics) {
          if(error) {throw error;}
            db.query(`SELECT * FROM author`, function(error2, authors) {
              if(error2) {throw error2;}

            const title = topics[0].title;
            const list = template.list(topics);
            const html = template.html(title, list,
            ` <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p><textarea name="description" placeholder="description"></textarea></p>
                <p>
                  ${template.authorSelect(authors)}
                </p>
                <p>
                <input type="submit">
                </p>
              </form>`,
            ` <a href="/create">create</a>`
            );
            response.writeHead(200);
            response.end(html);
          })
        });  
      } else if(pathname === '/create_process'){
          var body = '';
            request.on('data', function(data){
              body = body + data;
            }); 

            request.on('end', function(){
              var post = qs.parse(body);      //inserted info(title, desc)

            db.query(`
            INSERT INTO topic (title, description, created, author_id)
              VALUES(?, ?, NOW(), ?)`,
              [post.title, post.description, post.author],
              function(error, result) {
                if(error) {throw error;}
                response.writeHead(302, {Location: `/?id=${result.insertId}`});
                response.end();
              });              
        });
      } else if(pathname === '/update'){
          db.query(`SELECT * FROM topic`, function(error, topics) {
            if(error) {throw error;}
          db.query(`SELECT * FROM topic WHERE id = ?`,[queryData.id], function(error2, topic){
            if(error2) {throw error2;}
            db.query(`SELECT * FROM author`, function(error3, authors) {
              if(error3) {throw error3;}
              var id = topic[0].id;
              var title = topic[0].title;
              var description = topic[0].description;

              var list = template.list(topics);
              var html = template.html(title, list,
                `
                <form action="/update_process" method="post">
                  <input type="hidden" name="id" value="${id}">
                  <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                  <p><textarea name="description" placeholder="description">${description}</textarea></p>
                  <p>
                    ${template.authorSelect(authors, topic[0].author_id)}
                  </p>
                  <p><input type="submit"></p>
                </form>
                `,
                `<a href="/create">create</a> 
                 <a href="/update?id=${id}">update</a>`
              );
            response.writeHead(200);
            response.end(html);
            });              
          });
      });
      } else if(pathname === '/update_process'){
         var body = '';
          request.on('data', function(data){
          body = body + data;
      });
        request.on('end', function(){
          var post = qs.parse(body);
          db.query(`
          UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`, 
          [post.title, post.description, post.author, post.id],
          function(error, result) {
            if(error) {throw error;}
            response.writeHead(302, {Location: `/?id=${post.id}`});
            response.end();
          })
      });
      } else if(pathname === '/delete_process'){
        var body = '';
        request.on('data', function(data){
        body = body + data;
      });
        request.on('end', function(){
        var post = qs.parse(body);
          db.query(`DELETE FROM topic WHERE id = ?`,[post.id], function(error, result) {
            if(error) {throw error};
            response.writeHead(302, {Location: `/`});
            response.end();
          })
        });
      } else {
        response.writeHead(404);
        response.end('Not found');
      }
    });
    app.listen(3000);

