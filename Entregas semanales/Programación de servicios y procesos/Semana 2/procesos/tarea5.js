onmessage = function(datos){
        // Calculo 1
            console.log(datos)
            console.log("Tu edad es "+datos.data.edad)
            console.log("Tu nombre es "+datos.data.nombre)
            console.log("Vamos con un calculo")
            var numero = 0.0000000000648723;
            var iteraciones = 1000000000;
            for(var i = 0;i<iteraciones;i++){
                numero = numero+1.0000000000873456;
            }

        postMessage(numero);
    
    }