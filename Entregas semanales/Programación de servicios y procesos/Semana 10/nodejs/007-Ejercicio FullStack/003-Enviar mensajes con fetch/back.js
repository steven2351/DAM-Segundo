var servidor = require('http');
var archivos = require('fs');
var ruta = require('url');
var procesador = require('querystring');
servidor.createServer(function(req,res){
   res.writeHead(200,{'Content-Type':'text/html'});
    console.log(req.url)
       if(req.url == "/"){
           console.log("principal");   archivos.readFile('front.html',function(err,data){
               if(err) throw err
                res.end(data)
            });
       }
        else if(req.url == "/recibe"){
           console.log("recibe");
        }else if(req.url.includes("/envia")){
           console.log("envía");
            var parametros = ruta.parse(req.url,true).query;
            console.log(parametros.mensaje)
            res.end("")
        }   
       //res.end("")
}).listen(8080);