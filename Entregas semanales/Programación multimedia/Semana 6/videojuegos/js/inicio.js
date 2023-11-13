/* En la función de inicio(function init) cargamos todas las condiciones iniciales del juego  */
function inicio(){

    /* Creó una instancia del objeto o personaje dentro de cada uno de los elementos del array */
    for (var i = 0;i<numeropersonajes;i++){
        arraypersonajes[i] = new Personaje;
    }
    /* Ahora lanzo la ejecución del bucle */
    temporizador = setTimeout("bucle()",1000);
  
    /* Lo que ocurre cuando el protagonista pulsa las teclas de direccion */
    $(document).keydown(function(e){
        if(e.key == "w"){direccion = 1;}
        if(e.key == "s"){direccion = 2;}
        if(e.key == "a"){direccion = 3;}
        if(e.key == "d"){direccion = 4;}
    })
    /* Lo que ocurre si despulsas las teclas */
    $(document).keyup(function(e){
        if(e.key == "w"){direccion = 0;}
        if(e.key == "s"){direccion = 0;}
        if(e.key == "a"){direccion = 0;}
        if(e.key == "d"){direccion = 0;}
    })
    //Volver al menu principal
    $(document).keydown(function(e){
        if(e.keyCode == 27){
            pausa = true;
            $("#pantallainicialmedio").fadeIn("slow");
            $("#contenedor").addClass("desenfocado");
        }
    })
    
    /* Cuando la ventana se reescala, calculamos de nuevo las proporciones de los contenederos en base a la ventana */
    $(window).resize(function(){
        anchuranavegdor = window.innerWidth;
        alturanavegador = window.innerHeight;
        document.getElementById("lienzo").height = alturanavegador;
        document.getElementById("lienzo").width = anchuranavegdor;
        document.getElementById("fondo").height = alturanavegador;
        document.getElementById("fondo").width = anchuranavegdor;
        document.getElementById("contenedor").height = alturanavegador;
        document.getElementById("contenedor").width = anchuranavegdor;
    })
    
    posicioninicialjugador()
    creaenemigos()
    creaobjetivo()
    
}