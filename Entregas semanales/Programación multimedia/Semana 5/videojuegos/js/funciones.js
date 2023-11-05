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
    var anchurabloque = 45;
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
            contextofondo.drawImage(bloque9,isox(x*anchurabloque,y*anchurabloque)+desfasex,isoy(x*anchurabloque,y*anchurabloque)+desfasey,anchuradibujo,anchuradibujo)
        }
    }
}


