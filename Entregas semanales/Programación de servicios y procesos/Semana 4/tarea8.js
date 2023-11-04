var id;                                                         //originalmente le asigno un identificador a este objeto
var otros;                                                      //le asigno una variable que recibira la coleccion de datos que corresponden a los otros objetos
var comida;                                                     //le asigna una variable que recibira la coleccion de datos que corresponden a la comida
onmessage = function(datos){                                    //esta funcion se ejecuta cuando recibo un mensaje
    id = datos.data.id;                                         //mi identificador es el que pasa a la funcion principal
    otros = datos.data.otros;                                   //recojo los datos de los otros objetos y los recojo dentro de una variable
    comida = datos.data.comida;                                 //recojo los datos de la comida y los pongo en la variable
}
var temporizador;                                               //como en un momento dado voy a tener un bucle, arranco una variable temporizador
inicio();                                                       //llamo a la funcion de inicio
var posx = Math.random()*512                                    //cuando el personaje nace, le aplico una posicion X aleatoria
var posy = Math.random()*512                                    //cuando el personaje nace, le aplico una posicion Y aleatoria
var cr = Math.round(Math.random()*256);                         //le pongo un color rojo aleatorio
var cg = Math.round(Math.random()*256);                         //le pongo un color verde aleatorio
var cb = Math.round(Math.random()*256);                         //le pongo un color azul aleatorio
var tam = 2                                                     //le pongo un tamaño de dos que luego se cambiara
var direccion = Math.random()*Math.PI*2                         //le doy una direccion inicial aleatoria entre cero  y 360
var velocidad = Math.random()/2+0.3                             //le proporciono una velocidad inicial aleatoria
var energia = Math.random()*50+50;                              //le proporciono una energia inicial aleatoria
var hambre = 100-Math.random()*50+50;                           //le proporciono una  cantidad inicial de hambre aleatoria
var muerto = false;                                             //cuando el personaje arranca por defecto no esta muerto
var dormido = false;                                            //cuando el personaje arranca por defecto no esta dormido
var hambriento = false;                                         //cuando el personaje arranca por defecto no esta hambriento

function inicio(){                                              //ejecuto la funcion de inicio
    temporizador = setTimeout("bucle()",1000)                   //la funcion de iniciode momento es lo unico que hace es llamar al bucle
}
function colisiona(){                                           //esta funcion busca los bordes y conecta las colisiones
    if(posx < 0 || posx > 512 || posy < 0 || posy > 512){       //si es cierto que el personaje esta fuera de los limites
        direccion += Math.PI;                                   //en ese caso el personaje pega la vuelta
    }
}
function mueve(){                                               //esta funcion se encarga de gestionar el movimiento del personaje
    posx += Math.cos(direccion)                                 //actualizamos la posicion X en base al coseno
    posy += Math.sin(direccion)                                 //actualizamos la posicion X en base al seno
    energia -=0.1;                                              //cuando el personaje se mueve pierde energia
    hambre +=0.1;                                               //cuando el personaje se mueve gana un poco de hambre
}
function cambiadireccion(){                                     //esta funcion controla que el personaje vaya cambiando poco a poco de direccion
    direccion += (Math.random()-0.5)*0.25                       //le añadimos una pequeña componente aleatoria al angulo de direccion del personaje
}
function buscocomida(){                                         //esta funcion se encarga de la busqueda de comida
    if(hambriento == true){                                     //solo se ejecuta si el personaje esta hambriento
        for(var i = 0;i<comida.length;i++){                     //miramos dinde estan todos los comederos
            var a = posx - comida[i].x;                         //sacamos la distancia horizontal
            var b = posy - comida[i].y;                         //sacamos la distancia vetical
            var distancia = Math.sqrt(a*a + b*b);               //calculamos el modulo de la distancia
            if(distancia < 60){                                 //en el caso de que la distancia sea menor que 40
                
                var angleRadians = Math.atan2(comida[i].y - posy,comida[i].x - posx);       //Me dirijo hacia ese comedero
                
                direccion = angleRadians                        //actualizo mi angulo
                if(distancia < 20){                             //y en caso de que la distancia con el comedero sea poca
                    hambre -= 1                                 //rebajo mi hambre comiendo
                }
            }
        }
    }
    
}
function evitarse(){                                            //esta funcion gestiona que los personajes se eviten entre si
    for(var i = 0;i < otros.length;i++){                        //mira donde estan todos y cada uno del resto de los personajes
        var a = posx - otros[i].x;                              //sacamos la distancia en horizontal
        var b = posy - otros[i].y;                              //sacamos la distancia en vertical
        var distancia = Math.sqrt(a*a + b*b);                   //para cada uno de los personajes miro mi distancia con respecto a ellos
        
        if(distancia < 4 && otros.id != id && distancia > 3  && hambriento == false){       //y en el caso de que el personaje este cerca
            
            var angleRadians = Math.atan2(posy - comida[i].y,posx - comida[i].x);//busco ek angulo de escape
            
            direccion = angleRadians+Math.PI/2                  //y lo aplico a mi angulo
            posx += Math.cos(direccion)*velocidad               //actualizo mi posicion x con respecto a ese angulo
            posy += Math.sin(direccion)*velocidad               //actualizo mi posicion y con respecto a ese angulo
            tam = 8                                             //temporalmente cambia mi tamaño simplemente para que se sepa que he colisionado
        }
    }
}
function duerme(){                                              //esto es lo que ocurre cuando el personaje duerme
    energia+=0.3;                                               //su energia se recupera
    hambre += 0.1;                                              //pero el hambre sube
}
function muerte(){                                              //esto ocurre cuando el personaje muere
    if(hambre > 100){
        muerto = true;                                          //por defecto la variable muerte se pone en verdadero
        cr = 0;                                                 //su color se vuelve negro
        cg = 0;
        cb = 0;
    }
}
function bucle(){                                               //esta es la funcion de bucle que se ejecuta constantemente
    if(hambre < 0){hambre = 0}                                  //no es posible tener hambre negativa
    if(energia > 100){energia = 100}                            //no es posible tener mas de 100 puntos de energia
    if(muerto == false){                                        //si el personaje esta vivo
        tam = energia/10;                                       //su tamaño esta en funcion de su energia
        colisiona();                                            //activamos la funcion de colisionar
        cambiadireccion();                                      //activamos la funcion de cambio de direccion
        buscocomida();                                          //activamos la funcion de busqueda de energia
        if(energia < 20){dormido = true;}                       //si el personaje tiene poca energia se queda dormido
        if(dormido == true){duerme();}                          //si el personaje esta dormido se ejecuta la funcion duerme
        if(energia > 80){dormido = false;}                      //si la energia supera los 80 deja de dormir
        if(dormido == false){mueve();}                          //cuando se despierta se vuelve a mover
        if(hambre > 80){hambriento = true;}                     //si el hambre del personaje esta por encima de 80 esta hambriento
        
        if(hambre < 20){hambriento = false;direccion = Math.random()*Math.PI*2;}        //si el hambre esta por debajo de 20 deja de estar hambriento
        
        evitarse();                                             //activamos la funcion evitarse
        
    } postMessage({id:id,x:posx,y:posy,mir:cr,mig:cg,mib:cb,tam:tam})                   //pasamos a la funcion principal los datos del personaje
    
    clearTimeout(temporizador)                                  //limpiamos el temporizador anterior
    temporizador = setTimeout("bucle()",33)                     //y creamos un temporizador recursivo que se llamo asimismo para hacer otra vuelta del bucle
}