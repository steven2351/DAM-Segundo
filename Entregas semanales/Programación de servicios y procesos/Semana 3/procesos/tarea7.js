onmessage = function(datos){
    for(var i = 0;i<datos.data.px.data.length-8;i+=4){
        //supongo que no hay bordes en el pixel que estoy registrando
        borde = false;
        // para cada uno de los pixeles compruebo si hay mucha diferencia de color o no la hay
        if(Math.abs(datos.data.px.data[i] - datos.data.px.data[i-(datos.data.mianchurabucket*4)-4]) > datos.data.miumbral){borde = true;}         //pixel arriba a la izq
        if(Math.abs(datos.data.px.data[i] - datos.data.px.data[i-(datos.data.mianchurabucket*4)]) > datos.data.miumbral){borde = true;}           //pixel arriba
        if(Math.abs(datos.data.px.data[i] - datos.data.px.data[i-(datos.data.mianchurabucket*4)+4]) > datos.data.miumbral){borde = true;}         //pixel arriba a la der
        if(Math.abs(datos.data.px.data[i] - datos.data.px.data[i-4]) > datos.data.miumbral){borde = true;}                           //pixel iz
        if(Math.abs(datos.data.px.data[i] - datos.data.px.data[i+4]) > datos.data.miumbral){borde = true;}                           //pixel der
        if(Math.abs(datos.data.px.data[i] - datos.data.px.data[i+(datos.data.mianchurabucket*4)-4]) > datos.data.miumbral){borde = true;}         //pixel abajo a la izq
        if(Math.abs(datos.data.px.data[i] - datos.data.px.data[i+(datos.data.mianchurabucket*4)]) > datos.data.miumbral){borde = true;}           //pixel abajo
        if(Math.abs(datos.data.px.data[i] - datos.data.px.data[i+(datos.data.mianchurabucket*4)+4]) > datos.data.miumbral){borde = true;}         //pixel abajo a la der

        // En caso de que haya borde, pinto de negro
        if(borde == true){
            datos.data.pxdst.data[i] = 0;                                                         //pongo el componente rojo a 0
            datos.data.pxdst.data[i+1] = 0;                                                       //pongo el componente verde a 0
            datos.data.pxdst.data[i+2] = 0;                                                       //pongo el componente azul en 0
            datos.data.pxdst.data[i+3] = 255;                                                     //pongo la transparencia opaca
        }else{                                                                                  //En caso de que no haya bordes, pinto de blanco
            datos.data.pxdst.data[i] = 255;                                                       //pongo el componente rojo al máximo valor
            datos.data.pxdst.data[i+1] = 255;                                                     //pongo el componente verde al máximo valor
            datos.data.pxdst.data[i+2] = 255;                                                     //pongo el componente azul al máximo valor
            datos.data.pxdst.data[i+3] = 255;                                                     //La transparencia la sigo poniendo opaca
        }
    }
    
    json = {mix:datos.data.mix,miy:datos.data.miy,resultado:datos.data.pxdst,miidworker:datos.data.idworker}
    postMessage(json);
    
    }
                    