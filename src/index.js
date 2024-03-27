const $botonJugar = document.querySelector("button");
const EMOJIS = ["😀", "😠", "😉", "😎", "😢", "😛", "😲", "🙄"];
const elementosTablero = EMOJIS.concat(EMOJIS);
let $primerCuadro = null;
let intentos = 0;

$botonJugar.onclick = configurarTablero;

function configurarTablero() {
  const $tablero = document.querySelector("#tablero");
  const $cuadros = document.querySelectorAll(".cuadro");
  const elementosMezclados = mezclarElementos();

  $cuadros.forEach((cuadro, indice) => {
    cuadro.textContent = elementosMezclados[indice];
  });

  manejarEleccionUsuario($tablero);
}

function mezclarElementos() {
  return elementosTablero.sort(() => 0.7 - Math.random());
}

function manejarEleccionUsuario($tablero) {
  $tablero.onclick = (e) => {
    const $cuadro = e.target;

    if ($cuadro.classList.contains("cuadro")) {
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
  cuadro.style.fontSize = "xx-large";
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
