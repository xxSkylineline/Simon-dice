const secuenciaMaquina = [];
const secuenciaJugador = [];
const $cuadros = document.querySelectorAll(".cuadrado");
const $iniciador = document.querySelector("#iniciador");
let numeroDeRonda = 0;
let segundos = 1000;
function cambiaMensaje(mensaje) {
  let $titulo = document.querySelector("#titulo");
  $titulo.textContent = mensaje;
}

function secuenciaSimon(numeroDeRonda) {
  valorNuevoASecuencia = Math.floor(Math.random() * $cuadros.length);
  secuenciaMaquina.push(valorNuevoASecuencia);
  console.log(secuenciaMaquina);
}

function TurnoMaquina() {
  numeroDeRonda += 1;
  let segundos = 1000;
  cambiaMensaje("TURNO MAQUINA");
  secuenciaSimon(numeroDeRonda);
  bloquearUsuario();
  secuenciaMaquina.forEach(function (elemento, i) {
    iluminaOpacaCuadro($cuadros[elemento], i);
  });
  setTimeout(() => {
    turnoUsuario();
  }, secuenciaMaquina.length * segundos);
}

function bloquearUsuario() {
  $cuadros.forEach(function (cuadro) {
    cuadro.onclick = function () {};
  });
}

function turnoUsuario() {
  const secuenciaJugador = [];
  let tiempoDeEspera = 0;


  $cuadros.forEach(function (cuadro, index) {
    cambiaMensaje("TURNO USUARIO");
    let i = index
    
    cuadro.addEventListener("click", () => {
      secuenciaJugador.push(index);
      iluminaOpacaCuadro(cuadro, tiempoDeEspera);

      if (secuenciaJugador[index] != secuenciaMaquina[index]) {
        finDeJuego();
        bloquearUsuario();
      }

      if (secuenciaJugador.length == secuenciaMaquina.length) {
        setTimeout(() => {
          TurnoMaquina();
        }, numeroDeRonda * 1000);
      }
      console.log(secuenciaJugador[index] === secuenciaJugador[index])
    });

    /* cuadro.onclick = function () {
      
    };
 */
    /* let esCorrecto = compruebaError(secuenciaJugador, index)
    if(secuenciaJugador.length === secuenciaMaquina.length && esCorrecto === true ){
      console.log("FIN DE JUEGO")
    } */
    console.log("secuencia JUGADOR" + secuenciaJugador);
  });
}

const secuenciaMaquina = [];
let numeroDeRonda = 0;
let segundos = 1000;
const $cuadros = document.querySelectorAll(".cuadrado");

let $iniciador = document.querySelector("#iniciador");

$iniciador.onclick = iniciaJuego;

function iniciaJuego() {
  $iniciador.disabled = true;

  TurnoMaquina();
}

function iluminarCuadro(elemento) {
  elemento.classList.remove("opacidad-baja");
}

function opacarCuadro(elemento) {
  elemento.classList.add("opacidad-baja");
}

function iluminaOpacaCuadro(elemento, i) {
  let segundoDeEspera = 0.5;

  setTimeout(() => {
    iluminarCuadro(elemento);
  }, segundos * i);
  setTimeout(() => {
    opacarCuadro(elemento);
  }, segundos * (i + segundoDeEspera));
}

function compruebaError(secuenciaJugador, i) {
  let esCorrecto = false;
  if (secuenciaJugador[i] == secuenciaMaquina[i]) {
    esCorrecto = true;
  }
  return esCorrecto;
}

function finDeJuego() {
  cambiaMensaje("FIN DEL JUEGO");
  bloquearUsuario();
  habilitaBoton();
  reset();
}

function habilitaBoton() {
  $iniciador.disabled = false;
}

function reset() {
  numeroDeRonda = 0;
  secuenciaMaquina.splice(secuenciaMaquina.length);
}
