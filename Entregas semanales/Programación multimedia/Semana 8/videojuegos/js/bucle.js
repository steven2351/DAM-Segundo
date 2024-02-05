/* Aqui cargamos todo aquello que se va a ir repitiendo una y otra vez durantre el juego (function loop)*/
function bucle(){
    /* Al principio de cada bucle borramos el lienzo anterior */
    contexto.clearRect(0,0,anchuranavegdor,alturanavegador);
    contextopunto.clearRect(0,0,512,512);
    contextopunto.fillRect(posx/50,posy/50,4,4);
    dibujaterreno();
    colisionaterreno()
    calculodesfase()
    pintanpc()    
    pintarecogibles()    
    pintaprops()  
    pintapersonje()
    colisionaprops()
    pintopremio()
    muere()
    
    clearTimeout(temporizador); /* Esta linea elimina el temporizador actual */
    if(pausa == false){
    temporizador = setTimeout("bucle()",100);/* Creamos un nuevo temporizador para volver a ejecutar el bucle */
    }
}