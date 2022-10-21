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
//prendo il container in cui generare la griglia
const container = el('.game-container');

// array con le impostazioni della difficoltà di gioco (numero di celle da stampare)
const gameLevels = [100, 81, 49, 25];
// numero di bombe di default
const gameBombsDefault = 16;
// array vuoto in cui salverò la posizione delle bombe della partita
const startGameBombs = [];


// al click sul bottone play inizia il gioco
playButton.addEventListener('click', startGame);


/**
 * Questa funzione racchiude tutte le operazioni per iniziare a giocare
 */
function startGame() {
  // faccio il reset della griglia
  resetAll(container);

  //prendo il value della select (difficoltà selezionata)
  const difficultySelected = difficultyChosenByUser.value;

  // in base alla difficoltà selezionata assegno il numero di celle
  const squaresNumber = gameLevels[difficultySelected];
  
  // sapendo il numero totali di celle date dalla selezione della difficoltà uso la funzione squareRoot (radice quadrata) per capire quante celle vanno su una sola riga e assegno questo dato ad una variabile
  const squaresInline = squareRoot(squaresNumber);

  //faccio un for per ogni cella che devo generare e le stampo con la funzione generateCells
  for(let i = 1; i <= squaresNumber; i++) {
    generateSquares(squaresInline, i);
  }
}


/** Arrow function che fa il reset html dell'elemento
 * 
 * @param {element} element 
 * @returns svuota l'html
 */
const resetAll = (element) => element.innerHTML = '';



/** Arrow function che dato un numero mi restituisce la radice quadrata
 * 
 * @param {number} number 
 * @returns radice quadrata
 */
const squareRoot = (number) => Math.sqrt(number);


/** Funzione che crea la cella con le varie classi e il calc della width e la appende nel container
 * 
 * @param {number} squareInline 
 * @param {number} index 
 */
function generateSquares(squareInline, index) {
  // creo div.square
  const square = document.createElement('div');
  // assegno classi Bootsrap flex alla cella per centrare la scritta e classe .square
  square.classList.add('square', 'd-flex', 'justify-content-center', 'align-items-center');
  //scrivo lo stile inline del calc sulla width
  square.style.width = `calc(100% / ${squareInline})`;
  //scrivo il numero nel quadratino
  square.innerText = index;
  // appendo il quadratino al container
  container.append(square);
  // questo accadrà quando cliccherò su quella cella
  square.addEventListener('click', clickSquare);
}


/** 
 * Funzione che riconosce la cella cliccata grazie a this, stampa in console il numero della della e assegna la classe .click
 */
function clickSquare() {
  console.log(this.innerText);
  this.classList.add('click');
}


