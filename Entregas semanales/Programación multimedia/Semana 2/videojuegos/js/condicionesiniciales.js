/* Capturamos el lienzo y lo introducimos dentro de una variable contxeto */
var contexto = document.getElementById("lienzo").getContext("2d");

/* Aqui voy adeclarar todas las variables globales a todo programa */
var temporizador;
var anchuranavegdor = window.innerWidth;
var alturanavegador = window.innerHeight;
document.getElementById("lienzo").height = alturanavegador;
document.getElementById("lienzo").width = anchuranavegdor;
document.getElementById("fondo").height = alturanavegador;
document.getElementById("fondo").width = anchuranavegdor;
document.getElementById("contenedor").height = alturanavegador;
document.getElementById("contenedor").width = anchuranavegdor;

/* En esta zona vamos a cargar las imagenes que vamos a utilizar en el videojuego */
var imagenpersonaje = new Image();
imagenpersonaje.src = "img/personaje.png";
var imagennpc1 = new Image();
imagennpc1.src = "img/personajenpc1.png";
var imagenpremio = new Image();
imagenpremio.src = "img/premio.png";

var numeropersonajes = 5;
var arraypersonajes = new Array();

// Propiedades del protagonista
var posx = 800;
var posy = 10;
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