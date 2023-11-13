function colisionaterreno(){
    
    /* Colisión del personaje con el terreno */
    var pixelpersonaje = contextomapa.getImageData(Math.round(posx/50)+1,Math.round(posy/50)+1,1,1)
    for(var i = 0;i<pixelpersonaje.data.length;i+=4){
        var cr = pixelpersonaje.data[i];
        var cg = pixelpersonaje.data[i+1];
        var cb = pixelpersonaje.data[i+2];
        var ca = pixelpersonaje.data[i+3];
        posz = cr*alturabloquez;
        if(ca == 0){
            console.log("caer")
            velocidadz *= 1.3;
            posz -= velocidadz;
        }
    }
    if(posz < -800){
        window.location = window.location;
    }
}
function calculodesfase(){
    var mediopantallax = anchuranavegdor/2;
    var mediopantallay = alturanavegador/2;
    /*
    if(isox(posx,posy)+desfasex <= mediopantallax){desfasex+=velocidaddesfase;}else{desfasex-=velocidaddesfase;}
    if(isoy(posx,posy)+desfasey < mediopantallay){desfasey+=velocidaddesfase;}else{desfasey-=velocidaddesfase;}
    */
    desfasex = mediopantallax - isox(posx,posy)
    desfasey = mediopantallay - isoy(posx,posy)
     
    ////////////////////////////////////* Itermos en todos los elementos del array y realizamos las operaciones */////////////////////////////////////////////////
}
function pintanpc(){
    ///////////////////////////        Personajes NPC           //////////////////////
    
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
        
        if(
               isox(arraypersonajes[i].x,arraypersonajes[i].y)+desfasex > -100
                &&
               isox(arraypersonajes[i].x,arraypersonajes[i].y)+desfasex < anchuranavegdor
               &&
               isoy(arraypersonajes[i].x,arraypersonajes[i].y)+desfasey > -100
               &&
               isoy(arraypersonajes[i].x,arraypersonajes[i].y)+desfasey < alturanavegador
           ){ 
            
            if(arraypersonajes[i].color == 0){imagennpc = imagennpc1;}
            else if(arraypersonajes[i].color == 1){imagennpc = imagennpc2;}
            else if(arraypersonajes[i].color == 2){imagennpc = imagennpc3;}
            else if(arraypersonajes[i].color == 3){imagennpc = imagennpc4;}
            else if(arraypersonajes[i].color == 4){imagennpc = imagennpc5;}
            else if(arraypersonajes[i].color == 5){imagennpc = imagennpc6;}


            /* Dibujo al personaje */
            contexto.drawImage(
                imagennpc,
                arraypersonajes[i].estadoanim*256,
                ytemp+256,
                256,256,
                isox(arraypersonajes[i].x,arraypersonajes[i].y)+desfasex,
                isoy(arraypersonajes[i].x,arraypersonajes[i].y)+desfasey-arraypersonajes[i].z*alturabloquez,128,128);

            /* Dibujo la barra de energia */
            contexto.fillStyle = "black";
            contexto.fillRect(
                isox(arraypersonajes[i].x,arraypersonajes[i].y)+32+desfasex,
                isoy(arraypersonajes[i].x,arraypersonajes[i].y)+desfasey-arraypersonajes[i].z*alturabloquez,64,10
            )
            contexto.fillStyle = "green";
            contexto.fillRect(
                isox(arraypersonajes[i].x,arraypersonajes[i].y)+32+2+desfasex,
                isoy(arraypersonajes[i].x,arraypersonajes[i].y+2)+desfasey-arraypersonajes[i].z*alturabloquez,60*(arraypersonajes[i].energia/100)
                ,6
            )
        }
    }
    ///////////////////////////        Personajes NPC           //////////////////////

}
function pintarecogibles(){
    //////////////////////////        RECOGIBLES           //////////////////////
     for(var i = 0;i<numerorecogibles;i++){
      
          var a = posx - arrayrecogibles[i].x;
            var b = posy - arrayrecogibles[i].y;
            var distancia = Math.sqrt( a*a + b*b )
            if(distancia < 50){
                arrayrecogibles.splice(i, 1);
                numerorecogibles--;
                energia += 20;
            }
         
         if(arrayrecogibles[i].tipo == 1){
             contexto.drawImage(
                imagenrecogible1,
                isox(arrayrecogibles[i].x,arrayrecogibles[i].y)+desfasex,
                isoy(arrayrecogibles[i].x,arrayrecogibles[i].y)+desfasey-arrayrecogibles[i].z*alturabloquez,
                128,
                128
            );
         }
         if(arrayrecogibles[i].tipo == 2){
             contexto.drawImage(
                imagenrecogible2,
                isox(arrayrecogibles[i].x,arrayrecogibles[i].y)+desfasex,
                isoy(arrayrecogibles[i].x,arrayrecogibles[i].y)+desfasey-arrayrecogibles[i].z*alturabloquez,
                128,
                128
            );
         }
         if(arrayrecogibles[i].tipo == 3){
             contexto.drawImage(
                imagenrecogible3,
                isox(arrayrecogibles[i].x,arrayrecogibles[i].y)+desfasex,
                isoy(arrayrecogibles[i].x,arrayrecogibles[i].y)+desfasey-arrayrecogibles[i].z*alturabloquez,
                128,
                128
            );
         }
         
         
         
           
    }
    //////////////////////////        RECOGIBLES           /////////////////////

}
function pintaprops(){
    
    //////////////////////////        PROPS           /////////////////////
     for(var i = 0;i<numeroprops;i++){
      
         /* Dibujo al personaje */
        //console.log("prop")
         contexto.drawImage(
                imagenprop1,
                isox(arrayprops[i].x,arrayprops[i].y)+desfasex,
                isoy(arrayprops[i].x,arrayprops[i].y)+desfasey-arrayprops[i].z*alturabloquez,
                128,
                128
            );
         
         
           
    }
    //////////////////////////        PROPS           /////////////////////
}
function pintapersonje(){
    ////////////////////////////////////////////////////// /* Vamos con el personaje protagonista *////////////////////////////////////////////////////////////////
    if(saltando == true){
        saltopersonaje  += alturaz;
        alturaz -= 5;
        if(saltopersonaje < 0){
            saltando = 0;
        }
    }
    if((moviendo == true && accion == false) ||  accion == true){
        estadoanimacion++;
        if(estadoanimacion > 7){
            estadoanimacion = 0;accion= false;
        }
    }else{
        estadoanimacion = 2;
    }
    if(accion == true){
    contexto.drawImage(
            imagenpersonajeaccion,
            estadoanimacion*256,
            angulo+256,
            256,256,
            isox(posx,posy)+desfasex,
            isoy(posx,posy)+desfasey-posz-saltopersonaje
            ,128,128
    );}else{
    contexto.drawImage(
            imagenpersonaje,
            estadoanimacion*256,
            angulo+256,
            256,256,
            isox(posx,posy)+desfasex,
            isoy(posx,posy)+desfasey-posz-saltopersonaje
            ,128,128
    );}
     /* Dibujo la barra de energia */
        contexto.fillStyle = "black";
        contexto.fillRect(
            isox(posx,posy)+32+desfasex,
            isoy(posx,posy)+desfasey-posz-saltopersonaje,64,10
        )
        contexto.fillStyle = "blue";
        contexto.fillRect(
            isox(posx,posy)+32+2+desfasex,
            isoy(posx,posy+2)+desfasey-posz-saltopersonaje,60*(energia/100)
            ,6
        )

} 
function colisionaprops(){
    
    if(direccion == 1){
         var solido = contextomapaprops.getImageData(Math.floor((posx)/50)+1,Math.floor((posy-velocidad)/50)+1,1,1).data[3]
         console.log("solido es:"+solido)
        //if(solido == 0){
            posy -= velocidad;angulo=512;
        //}
        
    }
    if(direccion == 2){
       var solido = contextomapaprops.getImageData(Math.floor((posx)/50)+1,Math.floor((posy+velocidad)/50)+1,1,1).data[3]
        //if(solido  == 0){
            posy+=velocidad;angulo=1536;
        //}
    }
    if(direccion == 3){
         var solido = contextomapaprops.getImageData(Math.floor((posx-velocidad)/50)+1,Math.floor((posy)/50)+1,1,1).data[3]
        //if(solido  == 0){
            posx-=velocidad;angulo=0;
        //}
    }
    if(direccion == 4){
         var solido = contextomapaprops.getImageData(Math.floor((posx+velocidad)/50)+1,Math.floor((posy)/50)+1,1,1).data[3]
        //if(solido  == 0){
            posx+=velocidad;angulo=1024;
        //}
    }
    
}
function pintopremio(){
        contexto.drawImage(imagenpremio,isox(premiox,premioy)+desfasex,isoy(premiox,premioy)+desfasey-posz);
    a = posx - premiox;
    b = posy - premioy;
    distancia = Math.sqrt(a*a + b*b)
    if(distancia < 20){
        subirnivel();
    }
}
function muere(){
    if(energia < 0){
        $("#pantallainicial").fadeIn("slow");
        reiniciar();
        contexto.clearRect(0,0,anchuranavegdor,alturanavegador);
        pausa = true;
    }
}