/* Aqui cargamos todo aquello que se va a ir repitiendo una y otra vez durantre el juego (function loop)*/
function bucle(){
    /* Al principio de cada bucle borramos el lienzo anterior */
    contexto.clearRect(0,0,anchuranavegdor,alturanavegador);
    contextopunto.clearRect(0,0,512,512);
    contextopunto.fillRect(posx/50,posy/50,4,4);
    dibujaterreno();
    var mediopantallax = anchuranavegdor/2;
    var mediopantallay = alturanavegador/2;
    if(isox(posx,posy)+desfasex < mediopantallax){desfasex+=velocidaddesfase;}else{desfasex-=velocidaddesfase;}
    if(isoy(posx,posy)+desfasey < mediopantallay){desfasey+=velocidaddesfase;}else{desfasey-=velocidaddesfase;}
    ////////////////////////////////////* Itermos en todos los elementos del array y realizamos las operaciones */////////////////////////////////////////////////
    for (var i = 0;i<numeropersonajes;i++){
        
        var a = posx - arraypersonajes[i].x;
        var b = posy - arraypersonajes[i].y;
        var distancia = Math.sqrt(a*a + b*b)
        /* Muevo al personaje */
        if(distancia < 200){
            arraypersonajes[i].persigue();
        }else{
            arraypersonajes[i].mueve();
        }
                    
        if(distancia < 20){
            energia--;
        }
        var ytemp ;
        if(arraypersonajes[i].direccionisometrica == 0){ytemp=0;}
        if(arraypersonajes[i].direccionisometrica == 1){ytemp=512;}
        if(arraypersonajes[i].direccionisometrica == 2){ytemp=1024;}
        if(arraypersonajes[i].direccionisometrica == 3){ytemp=1536;}
        
        /* Dibujo al personaje */
        contexto.drawImage(
            imagennpc1,
            arraypersonajes[i].estadoanim*256,
            ytemp+256,
            256,256,
            isox(arraypersonajes[i].x,arraypersonajes[i].y)+desfasex,
            isoy(arraypersonajes[i].x,arraypersonajes[i].y)+desfasey,64,64);
        
        /* Dibujo la barra de energia */
        contexto.fillStyle = "black";
        contexto.fillRect(
            isox(arraypersonajes[i].x,arraypersonajes[i].y)+16+desfasex,
            isoy(arraypersonajes[i].x,arraypersonajes[i].y)+desfasey,32,10
        )
        contexto.fillStyle = "green";
        contexto.fillRect(
            isox(arraypersonajes[i].x,arraypersonajes[i].y)+16+1+desfasex,
            isoy(arraypersonajes[i].x,arraypersonajes[i].y+2)+desfasey,30*(arraypersonajes[i].energia/100)
            ,6
        )
    }
   ////////////////////////////////////////////////////// /* Vamos con el personaje protagonista *////////////////////////////////////////////////////////////////
    estadoanimacion++;
    if(estadoanimacion > 7){
        estadoanimacion = 0;
    }
    contexto.drawImage(
            imagenpersonaje,
            estadoanimacion*256,
            angulo+256,
            256,256,
            isox(posx,posy)+desfasex,
            isoy(posx,posy)+desfasey
            ,64,64);
     /* Dibujo la barra de energia */
        contexto.fillStyle = "black";
        contexto.fillRect(
            isox(posx,posy)+16+desfasex,
            isoy(posx,posy)+desfasey,32,10
        )
        contexto.fillStyle = "blue";
        contexto.fillRect(
            isox(posx,posy)+16+1+desfasex,
            isoy(posx,posy+2)+desfasey,30*(energia/100)
            ,6
        )

    if(direccion == 1){posy -= velocidad;angulo=512;}
    if(direccion == 2){posy += velocidad;angulo=1536;}
    if(direccion == 3){posx -= velocidad;angulo=0;}
    if(direccion == 4){posx += velocidad;angulo=1024;}
    
    contexto.drawImage(imagenpremio,isox(premiox,premioy)+desfasex,isoy(premiox,premioy)+desfasey);
    a = posx - premiox;
    b = posy - premioy;
    distancia = Math.sqrt(a*a + b*b)
    if(distancia < 20){
        subirnivel();
    }
    
    if(energia < 0){
        $("#pantallainicial").fadeIn("slow");
        reiniciar();
        contexto.clearRect(0,0,anchuranavegdor,alturanavegador);
        pausa = true;
    }
    
    clearTimeout(temporizador); /* Esta linea elimina el temporizador actual */
    if(pausa == false){
    temporizador = setTimeout("bucle()",33);/* Creamos un nuevo temporizador para volver a ejecutar el bucle */
    }
}