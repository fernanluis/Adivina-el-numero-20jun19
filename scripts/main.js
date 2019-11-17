// a la primera variable randomNumber se le asigna un numero al azar entre 1 y 100, calculado usando un algoritmo matematico

let randomNumber = Math.floor(Math.random() * 100) + 1;

/* Las tres primeras constantes sirven cada una para almacenar una referencia a los párrafos de resultados en nuestro HTML,
y se usaran para insertar valores en los párrafos más adelante en el código
*/
// Las constantes se utilizan para almacenar valores que no desea modificar y se crean con la palabra clave const.
/* en este caso, usamos constantes para almacenar referencias a partes de nuestra interfaz de usuario;
el texto dentro de algunas de ellas puede cambiar ,pero los elementos HTML referenciados permanecen iguales.
*/
const guesses = document.querySelector('.guesses'); //adivina
const lastResult = document.querySelector('.lastResult'); //ultimo resultado
const lowOrHi = document.querySelector('.lowOrHi'); // bajo o alto

/* Las siguientes dos constantes almacenan referencias al ingreso de texto-Guess y al botón "enviar-Submit" del formulario,
y se usan para controlar las respuestas del jugador más adelante.
*/
const guessSubmit = document.querySelector('.guessSubmit'); //adivina enviar
const guessField = document.querySelector('.guessField'); // campo de adivinanzas

/* Nuestras dos variables finales almacenan un conteo de intentos de 1 (utilizado para tener un registro de cuántos intentos
ha hecho  el jugador), y una referencia al botón de reinicio que aún no existe (pero existirá luego).
*/

let guessCount = 1;
let resetButton;
guessField.focus();

// se declara una variable llamada userGuess y establece su valor al introducirlo en el campo de texto.
// tambien pasamos este valor al metodo Number(), para asegurarnos que el valor  es un numero.

function checkGuess() {
  let userGuess = Number(guessField.value); // se declara una variable llamada userGuess y establece su valor al introducirlo en el campo de texto. Tambien pasamos este valor al metodo Number(), para asegurarnos que el valor  es un numero.
  if (guessCount === 1) { // incluimos un test, el test analiza si la variable guessCount es igual a 1
    guesses.textContent = 'Intentos anteriores: '; // si lo es, hacemos que el contenido del texto del parrafo de intentos sea igual a intentos previos, sino, no lo hacemos.
  } else {
  guesses.textContent += userGuess + ' '; // aniade el valor actual de userGuess al final del parrafo de guesses mas un espacio en blanco asi hay espacio entre cada intento mostado.
}
  if (userGuess === randomNumber) { // comprueba si la rta. del jugador es igual al randomNumber establecido al comienzo de nuestro JS. Si lo es, el jugador ha adivinado correctamentey ha ganado el juego, asique le mostraremos al jugador un mensaje de felicitaciones en color verde, limpiamos los contenidos del cuadro de informacion de intentos low/high, y ejecutamos una funcion setGameOver()..
    lastResult.textContent = '¡Felicidades! ¡Lo adivinaste!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver(); // a discutir luego..
  } else if (guessCount === 10) { // este compeuba si el turno es el ultimo. Si lo es, el programa hace los mismo que en el bloque anterior, excepto que en vez de mostrar un mensaje de felicitaciones, muestra uno de fin de juego.
    lastResult.textContent = '!!!¡¡¡Fin del juego!!!!!!';
    setGameOver(); // a discutir luego..
  } else {
    lastResult.textContent = '¡Equivocado!';
    lastResult.style.backgroundColor = 'red';
    if(userGuess < randomNumber) {
      lowOrHi.textContent = '¡El numero es muy bajo!!';
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = '¡El numero es muy grande!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess); // es un metodos que lleva dos valores de entrada, el tipo de eventos que queresmo escuchar, click, como una cadena, y el codigo que queremos ejecutar cuando  cuando ocurra el evento.

function setGameOver() {
  guessField.disabled = true; // deshabilian la entrada de texto y el boton al fijar sus propiedad deshabilitado a verdadero.
  guessSubmit.disabled = true; // deshabilian la entrada de texto y el boton al fijar sus propiedad deshabilitado a verdadero.
  resetButton = document.createElement('button'); // las tres sigtes lineas generan un elemento <button>, fijan su etiqueta de texto a comenzar nuevo juego, y lo aniaden al pie de nuestro HTML.
  resetButton.textContent = 'Iniciar nuevo juego';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame); // La línea final establece un escuchador de eventos en nuestro botón nuevo de manera que cuando se haga click sobre él, una función llamada resetGame() sea ejecutada.
}

function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll('.resultParas p');
  for (let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * 100) + 1;
}
