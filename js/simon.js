const secuenciaMaquina = [];
const secuenciaJugador = [];
const $cuadros = document.querySelectorAll(".cuadrado");
const $iniciador = document.querySelector("#iniciador");
let numeroDeRonda = 0;
let segundos = 1000;


$iniciador.onclick = iniciaJuego;

function iniciaJuego() {


  $iniciador.disabled = true;
  setTimeout(()=>{
    TurnoMaquina()
  }, segundos )
  ;
}

function cambiaMensaje(mensaje) {
  let $titulo = document.querySelector("#titulo");
  $titulo.textContent = mensaje;
}

function secuenciaSimon() {
  valorNuevoASecuencia = Math.floor(Math.random() * $cuadros.length);
  secuenciaMaquina.push(valorNuevoASecuencia);
  console.log(secuenciaMaquina);
}

function TurnoMaquina() {
  numeroDeRonda ++;

  let milisegundosDeRetraso = 1000;
  cambiaMensaje("TURNO MAQUINA");
  secuenciaSimon(numeroDeRonda);
  bloquearUsuario();
  secuenciaMaquina.forEach(function (elemento, i) {
    resaltaCuadro($cuadros[elemento], i);
  });
  setTimeout(() => {
    turnoUsuario();
  }, secuenciaMaquina.length * milisegundosDeRetraso);
}

function turnoUsuario() {
  const secuenciaJugador = [];
  let tiempoDeEspera = 0;
  let esCorrecto;
  
  cambiaMensaje("TURNO USUARIO");

  $cuadros.forEach(function(cuadro, index){
    cuadro.onclick = function(){
      esCorrecto = true;
      let posicionCuadro;

      secuenciaJugador.push(index);
      posicionCuadro = secuenciaJugador[secuenciaJugador.length-1]
      resaltaCuadro($cuadros[posicionCuadro], tiempoDeEspera)
      
      if(secuenciaJugador[secuenciaJugador.length-1] !== secuenciaMaquina[secuenciaJugador.length-1]){
        finDeJuego()
        esCorrecto = false
      }
    
      if(secuenciaJugador.length == secuenciaMaquina.length && esCorrecto == true){
        setTimeout(()=>{
          TurnoMaquina()
        }, 1000)
      }
    }
  });
}

function resaltaCuadro(elemento, i) {
  let segundoDeEspera = 0.5;

  setTimeout(() => {
    iluminarCuadro(elemento);
  }, segundos * i);
  setTimeout(() => {
    opacarCuadro(elemento);
  }, segundos * (i + segundoDeEspera));
}

function iluminarCuadro(elemento) {
  elemento.classList.remove("opacidad-baja");
}

function opacarCuadro(elemento) {
  elemento.classList.add("opacidad-baja");
}

function bloquearUsuario() {
  $cuadros.forEach(function (cuadro) {
    cuadro.onclick = function () {};
  });
}

function interaccionUsuario(indice) {
  let esCorrecto = true;
  secuenciaJugador.push(indice);
  resaltaCuadro($cuadros[indice])

  if(secuenciaJugador[secuenciaJugador.length-1] !== secuenciaMaquina[secuenciaJugador.length-1]){
    finDeJuego()
  }

  if(secuenciaJugador.length == secuenciaMaquina.length){
    setTimeout(()=>{
      TurnoMaquina()
    }, 1000)
  }
}

function compruebaError(secuenciaJugador, i) {
  let esCorrecto = false;
  if (secuenciaJugador[i] == secuenciaMaquina[i]) {
    esCorrecto = true;
  }
  return esCorrecto;
}

function agregaPasoASecuenciaJugador(secuenciaJugador,index){
  secuenciaJugador.push(index)
}

function finDeJuego() {
  cambiaMensaje("FIN DEL JUEGO");
  bloquearUsuario();
}

function habilitaBoton() {
  $iniciador.disabled = false;
}

function reset() {
  numeroDeRonda = 0;
  secuenciaMaquina.splice(secuenciaMaquina.length);
}
