const $botonJugar = document.querySelector("button");
const EMOJIS = ["😀", "😠", "😎", "😲", "🙄", "😂", "👍", "😭"];
const elementosTablero = EMOJIS.concat(EMOJIS);
let $primerCuadro = null;
let intentos = 0;
let cuadrosEmparejados = 0;

$botonJugar.onclick = configurarTablero;

function configurarTablero() {
  const $tablero = document.querySelector("#tablero");
  const $cuadros = document.querySelectorAll(".cuadro");
  const elementosMezclados = mezclarElementos();
  reiniciar($cuadros);

  $cuadros.forEach((cuadro, indice) => {
    cuadro.textContent = elementosMezclados[indice];
    mostrarCuadro(cuadro);
    ocultarCuadro(cuadro);
  });

  manejarEleccionUsuario($tablero);
}

function mezclarElementos() {
  return elementosTablero.sort(() => 0.7 - Math.random());
}

function manejarEleccionUsuario($tablero) {
  $tablero.onclick = (e) => {
    const $cuadro = e.target;

    if ($cuadro.classList.contains("cuadro") && !$cuadro.classList.contains("text-bg-secondary")) {
      mostrarCuadro($cuadro);

      if ($primerCuadro === null) {
        $primerCuadro = $cuadro;
      } else {
        compararCuadros($cuadro);
      }
    } else {
      return;
    }
  };
}

function mostrarCuadro(cuadro) {
  cuadro.style.fontSize = "x-large";
}

function ocultarCuadro(cuadro) {
  setTimeout(() => {
    cuadro.style.fontSize = "0%";
  }, 500);
}

function compararCuadros($cuadro) {
  if ($primerCuadro !== $cuadro) {
    intentos++;

    if ($primerCuadro.textContent === $cuadro.textContent) {
      deshabilitarCuadro($primerCuadro);
      deshabilitarCuadro($cuadro);
      cuadrosEmparejados += 2;
      finalizarJuego();
    } else {
      ocultarCuadro($primerCuadro);
      ocultarCuadro($cuadro);
    }

    $primerCuadro = null;
  } else {
    return;
  }
}

function deshabilitarCuadro($cuadro) {
  setTimeout(() => {
    $cuadro.textContent = "";
    $cuadro.classList.add("text-bg-secondary");
  }, 500);
}

function finalizarJuego() {
  if (cuadrosEmparejados === 16) {
    const $mensajeUsuario = document.querySelector("#mensaje");
    $mensajeUsuario.textContent = `Felicidades, ganaste y te tomó ${intentos} intentos`;
  } else {
    return;
  }
}

function reiniciar($cuadros) {
  const $mensajeUsuario = document.querySelector("#mensaje");
  $mensajeUsuario.textContent = "Encontrá los pares de emojis para ganar";
  $botonJugar.textContent = "Reiniciar";

  $cuadros.forEach((cuadro) => {
    if (cuadro.classList.contains("text-bg-secondary")) {
      cuadro.classList.remove("text-bg-secondary");
    }
  });
}
