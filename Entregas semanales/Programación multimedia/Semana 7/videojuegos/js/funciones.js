function isox(x,y){
    return(x-y);
}
function isoy(x,y){
    return((x+y)/2);
}
function reiniciar(){
    nivel = 1;
    numeropersonajes = 5;
    arraypersonajes = new Array();

    // Propiedades del protagonista
    posx = 800;
    posy = 10;
    estadoanimacion = 0
    angulo = 256;
    velocidad = 7;
    direccion = 0;
    energia = 100;

    /* Coordenadas minimas y maximas del terreno para los npc */
    terrenox1 = 550;
    terrenoy1 = -300;
    terrenox2 = 800;
    terrenoy2 = 200;

    pausa = false;
    for (var i = 0;i<numeropersonajes;i++){
        arraypersonajes[i] = new Personaje;
    }
}
function subirnivel(){
    pausa = true;
    nivel++;
    $("#dimenivel").html(nivel)
    $("#pantallanivel").fadeIn("slow");
    contexto.clearRect(0,0,anchuranavegdor,alturanavegador);
    setTimeout(function(){
        $("#pantallanivel").fadeOut("slow")
        pausa = false;
        bucle();
        
    },2000)
    numeropersonajes += 5;
    arraypersonajes = new Array();

    // Propiedades del protagonista
    posx = 800;
    posy = 10;
    estadoanimacion = 0;
    angulo = 256;
    velocidad = 5;
    direccion = 0;
    energia = 100;

    /* Coordenadas minimas y maximas del terreno para los npc */
    terrenox1 = 550;
    terrenoy1 = -300;
    terrenox2 = 800;
    terrenoy2 = 200;

    for (var i = 0;i<numeropersonajes;i++){
        arraypersonajes[i] = new Personaje;
    }
    
    premiox = Math.random()*(terrenox2-terrenox1)+terrenox1;
    premioy = Math.random()*(terrenoy2-terrenoy1)+terrenoy1;
}

function dibujaterreno(){
    contextofondo.clearRect(0,0,anchuranavegdor,alturanavegador);
    var anchurabloque = 50;
    var anchuradibujo = 120;
    contextomapa.drawImage(mapa,0,0);
    var pixeles = contextomapa.getImageData(0,0,512,512);
    for(var i = 0;i<pixeles.data.length;i+=4){
        var cr = pixeles.data[i];
        var cg = pixeles.data[i+1];
        var cb = pixeles.data[i+2];
        var ca = pixeles.data[i+3];
        var x = (((i)%(512))/4);
        var y = Math.floor((i/512)/4);
        if(ca == 255){      
           if(
               isox(x*anchurabloque,y*anchurabloque)+desfasex > -100
                &&
               isox(x*anchurabloque,y*anchurabloque)+desfasex < anchuranavegdor
               &&
               isoy(x*anchurabloque,y*anchurabloque)+desfasey > -100
               &&
               isoy(x*anchurabloque,y*anchurabloque)+desfasey < alturanavegador
           ){ contextofondo.drawImage(bloque9,isox(x*anchurabloque,y*anchurabloque)+desfasex,isoy(x*anchurabloque,y*anchurabloque)+desfasey-pixeles.data[i]*alturabloquez,anchuradibujo,anchuradibujo)
            }
        }
    }
}
    
function posicioninicialjugador(){
    contextomapapersonajes.drawImage(mapapersonajes,0,0);
    var pixeles = contextomapapersonajes.getImageData(0,0,512,512);
    for(var i = 0;i<pixeles.data.length;i+=4){
        var cr = pixeles.data[i];
        var cg = pixeles.data[i+1];
        var cb = pixeles.data[i+2];
        var ca = pixeles.data[i+3];
        var x = (((i)%(512))/4);
        var y = Math.floor((i/512)/4);
        if(ca == 255){
            if(cr == 0 && cg == 255 && cb == 0 & ca == 255){
                posx = x * 50;
                posy = y * 50;
            }
        }
    }
}
function creaenemigos(){
    contextomapapersonajes.drawImage(mapapersonajes,0,0);
    var pixeles = contextomapapersonajes.getImageData(0,0,512,512);
    for(var i = 0;i<pixeles.data.length;i+=4){
        var cr = pixeles.data[i];
        var cg = pixeles.data[i+1];
        var cb = pixeles.data[i+2];
        var ca = pixeles.data[i+3];
        var x = (((i)%(512))/4);
        var y = Math.floor((i/512)/4);
        if(ca == 255){
            if(cr == 255 && cg == 0 && cb == 0 & ca == 255){
                arraypersonajes[numeropersonajes] = new Personaje;
                arraypersonajes[numeropersonajes].x = x * 50
                arraypersonajes[numeropersonajes].y = y * 50
                numeropersonajes++;
            }
        }
    }
}

function creaprops(){
    contextomapaprops.drawImage(mapaprops,0,0)
     var pixeles = contextomapaprops.getImageData(0,0,512,512);
    for(var i = 0;i<pixeles.data.length;i+=4){
        var cr = pixeles.data[i];
        var cg = pixeles.data[i+1];
        var cb = pixeles.data[i+2];
        var ca = pixeles.data[i+3];
        var x = (((i)%(512))/4);
        var y = Math.floor((i/512)/4);
        if(ca == 255){
           if(cr == 255 && cg == 0 && cb == 0 & ca == 255){
               arrayprops[numeroprops] = new Props;
               arrayprops[numeroprops].x = x*50-50
               arrayprops[numeroprops].y = y*50-50
               arrayprops[numeroprops].z = contextomapa.getImageData(x,y,1,1).data[0]
               numeroprops++;
           }
        }
        
    }
}

function crearecogibles(){
    contextomaparecogibles.drawImage(maparecogibles,0,0)
     var pixeles = contextomaparecogibles.getImageData(0,0,512,512);
    for(var i = 0;i<pixeles.data.length;i+=4){
        var cr = pixeles.data[i];
        var cg = pixeles.data[i+1];
        var cb = pixeles.data[i+2];
        var ca = pixeles.data[i+3];
        var x = (((i)%(512))/4);
        var y = Math.floor((i/512)/4);
        if(ca == 255){
           if(cr == 255 && cg == 0 && cb == 0 & ca == 255){
               arrayrecogibles[numerorecogibles] = new Recogibles;
               arrayrecogibles[numerorecogibles].x = x*50-50
               arrayrecogibles[numerorecogibles].y = y*50-50
               arrayrecogibles[numerorecogibles].z = contextomapa.getImageData(x,y,1,1).data[0]
               numerorecogibles++;
           }
        }
        
    }
}

function creaobjetivo(){
    var pixeles = contextomapa.getImageData(0,0,512,512);
    for(var i = 0;i<pixeles.data.length;i+=4){
        var cr = pixeles.data[i];
        var cg = pixeles.data[i+1];
        var cb = pixeles.data[i+2];
        var ca = pixeles.data[i+3];
        var x = (((i)%(512))/4);
        var y = Math.floor((i/512)/4);
        if(cr == 0 && cg == 0 && cb == 255 & ca == 255){
                premiox = x * 50;
                premioy = y * 50;
        }
    }
}


