/* Capturamos el lienzo y lo introducimos dentro de una variable contxeto */
var contexto = document.getElementById("lienzo").getContext("2d");
var contextofondo = document.getElementById("lienzofondo").getContext("2d");
var contextomapa = document.getElementById("lienzomapa").getContext("2d");
var contextopunto = document.getElementById("lienzopunto").getContext("2d");
pixelesmapa = contextomapa.getImageData(0,0,512,512);

contextopunto.fillStyle = "red";
/* Aqui voy adeclarar todas las variables globales a todo programa */
var temporizador;
var anchuranavegdor = window.innerWidth;
var alturanavegador = window.innerHeight;
document.getElementById("lienzo").height = alturanavegador;
document.getElementById("lienzo").width = anchuranavegdor;
document.getElementById("lienzofondo").height = alturanavegador;
document.getElementById("lienzofondo").width = anchuranavegdor;
document.getElementById("fondo").height = alturanavegador;
document.getElementById("fondo").width = anchuranavegdor;
document.getElementById("contenedor").height = alturanavegador;
document.getElementById("contenedor").width = anchuranavegdor;

/* En esta zona vamos a cargar las imagenes que vamos a utilizar en el videojuego */
var imagenpersonaje = new Image();
imagenpersonaje.src = "img/personajes/personaje.png";

var imagennpc = new Image();
var imagennpc1 = new Image();
imagennpc1.src = "img/personajes/personajerojo.png";
var imagennpc2 = new Image();
imagennpc2.src = "img/personajes/personajeverde.png";
var imagennpc3 = new Image();
imagennpc3.src = "img/personajes/personajeazul.png";
var imagennpc4 = new Image();
imagennpc4.src = "img/personajes/personajecyan.png";
var imagennpc5 = new Image();
imagennpc5.src = "img/personajes/personajeamarillo.png";
var imagennpc6 = new Image();
imagennpc6.src = "img/personajes/personajemagenta.png";

var imagenpremio = new Image();
imagenpremio.src = "img/items/premio.png";
var mapa = new Image();
mapa.src = "img/mapas/mapa1posicion.png";
var bloque9 = new Image();
bloque9.src = "img/terreno/terreno9.png";

var numeropersonajes = 0;
var arraypersonajes = new Array();

// Propiedades del protagonista
var posx = 1000;
var posy = 200;
var posz = 0;
var velocidadz = 1;
var estadoanimacion = 0
var angulo = 256;
var velocidad = 7;
var direccion = 0;
var energia = 100;

/* Coordenadas minimas y maximas del terreno para los npc */
var terrenox1 = 550;
var terrenoy1 = -200;
var terrenox2 = 800;
var terrenoy2 = 200;

var premiox = 600
var premioy = 100

var nivel = 1;

var pausa = false;

var desfasex = 220;
var desfasey = 0;

var velocidaddesfase = 3;

