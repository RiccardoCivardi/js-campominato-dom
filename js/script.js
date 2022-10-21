/* **Consegna**
****L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
**BONUS:**
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
****2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste */


// scorciatoia per usare querySelector
const el = document.querySelector.bind(document);

// prendo la select della difficoltà
const difficultyChosenByUser = el('select')
// prendo il bottone dall'html
const playButton = el('button');
// prendo il div del punteggio
const playScore = el('#score');
//prendo il container in cui generare la griglia
const container = el('.game-container');

// array con le impostazioni della difficoltà di gioco (numero di celle da stampare)
const gameLevels = [100, 81, 49, 25];
// numero di bombe di default
const gameBombsDefault = 16;
// array vuoto in cui salverò la posizione delle bombe della partita
let startGameBombs = [];
// inizializzo il punteggio a 0
let score = 0;


// al click sul bottone play inizia il gioco
playButton.addEventListener('click', startGame);


/**
 * Questa funzione racchiude tutte le operazioni per iniziare a giocare
 */
function startGame() {

  // faccio il reset della griglia
  resetAll(container);
  // reset dello score in html
  resetAll(playScore);
  // faccio il reset del punteggio
  score = 0;
  

  //prendo il value della select (difficoltà selezionata)
  const difficultySelected = difficultyChosenByUser.value;

  // in base alla difficoltà selezionata assegno il numero di celle
  const squaresNumber = gameLevels[difficultySelected];
  
  // sapendo il numero totali di celle date dalla selezione della difficoltà uso la funzione squareRoot (radice quadrata) per capire quante celle vanno su una sola riga e assegno questo dato ad una variabile
  const squaresInline = squareRoot(squaresNumber);

  //faccio un for per ogni cella che devo generare e le stampo con la funzione generateSquares
  for(let i = 1; i <= squaresNumber; i++) {
    generateSquares(squaresInline, i);
  }

  // genero le bombe in modo casuale e univoco
  startGameBombs = generateBombs(squaresNumber); 
  console.log(startGameBombs);

}


/** 
 * Arrow function che fa il reset html dell'elemento
 * @param {element} element 
 * @returns svuota l'html
 */
const resetAll = (element) => element.innerHTML = '';


/** 
 * Arrow function che dato un numero mi restituisce la radice quadrata
 * @param {number} number 
 * @returns radice quadrata
 */
const squareRoot = (number) => Math.sqrt(number);


/** 
 * Funzione che crea la cella con le varie classi e il calc della width e la appende nel container
 * @param {number} squareInline 
 * @param {number} index 
 */
function generateSquares(squareInline, index) {
  // creo div.square
  const squareDiv = document.createElement('div');
  // creo lo span in cui scriverò il numero della cella
  const squareSpan = document.createElement('span');
  // assegno classi Bootsrap flex alla cella per centrare la scritta e classe .square
  squareDiv.classList.add('square', 'd-flex', 'justify-content-center', 'align-items-center');
  //scrivo lo stile inline del calc sulla width
  squareDiv.style.width = `calc(100% / ${squareInline})`;
  //creo proprietà custom al div.square a cui assegno l'index
  squareDiv.squareId = index;
  //scrivo il numero nel quadratino
  squareSpan.innerText = index;
  //appendo lo span al div.square
  squareDiv.append(squareSpan);
  // appendo il quadratino al container
  container.append(squareDiv);
  // questo accadrà quando cliccherò su quella cella
  squareDiv.addEventListener('click', clickSquare);
}


/**
 * Funzione per generare le bombe in modo univoco
 * @param {number} numberBombsdefault 
 * @returns array di bombe (numeri)
 */
function generateBombs(totalOfSquares) {
  // creo un array vuoto
  const arrayBombs = [];
  // mentre la lunghezza dell'array è inferiore al numero di estrazioni che devo fare
  while (arrayBombs.length < gameBombsDefault) {
    // estraggo la bomba in modo random
    const bomb = getRandomNumber(1, totalOfSquares);
    // se l'array non contiene la bomba la pusho nell'array, altrimenti continuo ad estrarre  
    if (!arrayBombs.includes(bomb)) arrayBombs.push(bomb);
  }
  // ritorna l'array di bombe
  return arrayBombs;
}

/**
 * Funzione random da minimo a massimo
 * @param {number} min 
 * @param {number} max 
 * @returns numero random
 */
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min +1) + min);


/** 
 * Funzione che riconosce la cella cliccata grazie a this, stampa in console il numero della cella e assegna la classe .click
 */
function clickSquare() {

  // se l'array delle bombe contine la proprietà custom del quadratino (colpito!)
  if(startGameBombs.includes(this.squareId)) {
    // aggiungo classe bomba e bomba al quadratino
    this.classList.add('bomb');
    this.querySelector('span').innerHTML = `<i class="fa-solid fa-bomb"></i>`;
    // stampo tutte le bombe
    showBombs();
    // fine gioco
    endGame(false);
    
  } else {
    // se invece non lo contiene aggiungo la classe click al quadratino
    this.classList.add('click'); 
    // incremento il punteggio del giocatore
    score++;
  }
  
  // creo html collection di tutti i quadrati per trovare il totale
   const totalSquares = document.getElementsByClassName('square');
   // creo punteggio massimo
   const maxScore = totalSquares.length - gameBombsDefault;
   // scrivo il punteggio in pagina
   playScore.innerText = `PUNTEGGIO ${score} di ${maxScore}`
  ;
  
  // se il punteggio del giocatore arriva al massimo
  if (score === maxScore) {
    // stampo tutte le bombe
    showBombs();
    //fine gioco
    endGame(true);
  } 

}

/**
 * Funzione che stampa tutte bombe se la partita finisce (sia vittoria che sconfitta)
 */
function showBombs() {
  
  // creo html collection di tutti i quadrati per trovare il totale
  const totalSquares = document.getElementsByClassName('square');
  
  // stampo tutte le bombe
  for(let i = 0; i < totalSquares.length; i++) {

    // creo square e gli assegno un solo quadratino con indice i
    const square = totalSquares[i];
    // se l'array delle bombe contiene la proprietà custom squareId
    if (startGameBombs.includes(square.squareId)) {
      // al quadrato in questione aggiungo la classe bomb e la bomba 
      square.classList.add('bomb');
      square.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
    }
  }
}


function endGame(isWin) {
  // costante del messaggio di vittoria sconfitta
  let msgWin;

  // se ho ricevuto true ho vinto
  if(isWin) msgWin = 'YOU WIN';
  // altrimenti ho perso
  else msgWin = 'GAME OVER';
  
  // creo div e span 
  const endLevDiv = document.createElement('div');
  const endLevSpan = document.createElement('span');
  // assegno classi e scrivo dentro allo span
  endLevDiv.classList.add('end-game-level', 'd-flex', 'justify-content-center', 'align-items-center');
  endLevSpan.innerText = msgWin;
  // appendo gli elementi nel container
  endLevDiv.append(endLevSpan);
  container.append(endLevDiv);
}
