const $botonJugar = document.querySelector('button');
const EMOJIS = ['😀', '😠', '😉', '😎', '😢', '😛', '😲', '🙄'];
const emojisDuplicados = EMOJIS.concat(EMOJIS);
let eleccionUsuario = [];
let eleccionesCorrectas = [];
let intentos = 0;

$botonJugar.onclick = function () {
  const emojisDesordenados = desordenarEmojis(emojisDuplicados);

  reiniciar();
  actualizarTablero(emojisDesordenados);
  animacionTablero();
  setTimeout(manejarInput, 1000);
}

function reiniciar() {
  document.querySelectorAll('div').forEach(function (cuadro) {
    cuadro.style.fontSize = 0;
    habilitarCuadro(cuadro);
    cuadro.classList.remove('text-bg-secondary');
  })
  document.querySelector('#mensaje').textContent = 'Encontrá los pares de emojis para ganar';
  $botonJugar.textContent = 'Jugar';
  eleccionUsuario = [];
  eleccionesCorrectas = [];
  intentos = 0;
}

function desordenarEmojis(emojis) {
  let m = emojis.length
  let t;
  let i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = emojis[m];
    emojis[m] = emojis[i];
    emojis[i] = t;
  }

  return emojis;
}

function actualizarTablero(emojis) {
  document.querySelectorAll('.cuadro').forEach(function (cuadro, indice) {
    cuadro.textContent = emojis[indice]
    cuadro.id = indice;
  })
}

function manejarInput() {
  eleccionUsuario = [];

  document.querySelectorAll('.cuadro').forEach(function (cuadro) {
    cuadro.onclick = validarEleccionUsuario;
  })
}

function validarEleccionUsuario(event) {
  const emoji = event.target;
  eleccionUsuario.push(emoji);

  if (emoji.id !== eleccionUsuario[0].id || eleccionUsuario.length === 1) {
    if (eleccionUsuario.length === 2) {
      intentos++;
      bloquearInputUsuario();
    }

    resaltarEmoji(emoji);

    setTimeout(function() {
      if (eleccionUsuario.length === 2) {
        const sonIguales = compararElementos();

        if (sonIguales) {
          eleccionesCorrectas.forEach(function(cuadro) {
            deshabilitarCuadro(cuadro);
          })
          manejarInput();
        } else {
          eleccionUsuario.forEach(function(cuadro) {
            habilitarCuadro(cuadro);
          })
          ocultarEmoji(emoji);
          manejarInput();
        }
      }

      if(eleccionesCorrectas.length === emojisDuplicados.length) {
        terminarPartida();
      }
    }, 2000);
  } else {
    eleccionUsuario.pop();
  }

}

function compararElementos() {
  const primerElemento = eleccionUsuario[0];
  const segundoElemento = eleccionUsuario[eleccionUsuario.length -1];

  if (primerElemento.textContent === segundoElemento.textContent) {
    eleccionesCorrectas.push(primerElemento);
    eleccionesCorrectas.push(segundoElemento);
    return true;
  } else {
    ocultarEmoji(primerElemento);
    ocultarEmoji(segundoElemento)
    return false;
  }
}

function resaltarEmoji(emoji) {
  emoji.style.fontSize = 'xx-large';
  emoji.classList.add('text-bg-secondary');
}


function ocultarEmoji(emoji) {
  emoji.style.fontSize = 0;
  emoji.classList.remove('text-bg-secondary');
}

function terminarPartida() {
  document.querySelector('#mensaje').textContent = `Ganaste y te tomó ${intentos} intentos`;
  $botonJugar.textContent = 'Reiniciar';
}

function animacionTablero() {
  document.querySelectorAll('.cuadro').forEach(function (cuadro) {
    cuadro.classList.add('text-bg-secondary');

    setTimeout(function () {
      cuadro.classList.remove('text-bg-secondary');
    }, 500);
  })
}

function bloquearInputUsuario() {
  document.querySelectorAll('.cuadro').forEach(function (cuadro) {
    cuadro.onclick = function() {};
  })
}

function deshabilitarCuadro(cuadro) {
  if (eleccionUsuario.length !== 2 || eleccionesCorrectas.length >= 2) {
    cuadro.classList.remove('cuadro');
  }
}

function habilitarCuadro(cuadro) {
  cuadro.classList.add('cuadro');
}
