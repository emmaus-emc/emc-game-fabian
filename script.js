/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 640; // x-positie van speler
var spelerY = 600; // y-positie van speler
var spelerXSnelheid = 4; // x-snelheid van speler
var spelerYSnelheid = 4; // y-snelhied van speler

var impX = 400; // x-positie van vijand Imp
var impY = 120; // y-positie van vijand Imp
const impXSnelheid = 1; // x-snelheid van vijand Imp
const impYSnelheid = 2; // y-snelheid van vijand Imp

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // vijand
    // Imp
    impY = impY + impYSnelheid;

    if(impX < spelerX) {
      impX = impX + impXSnelheid;
    };

    if(impX > spelerX) {
      impX = impX - impXSnelheid;
    };

  // kogel

  // speler
  if(keyIsDown(37)) {
    spelerX = spelerX - spelerXSnelheid;
  };

  if(keyIsDown(38)) {
    spelerY = spelerY - spelerYSnelheid;
  };

  if(keyIsDown(39)) {
    spelerX = spelerX + spelerXSnelheid;
  };

  if(keyIsDown(40)) {
    spelerY = spelerY + spelerYSnelheid;
  };
  
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten vijanden
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function () {
  // botsing speler tegen vijand

  // botsing kogel tegen vijand

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  // achtergrond
  background(128, 64, 32);

  noStroke();
  fill(128, 64, 8);
  rect(0, 0, 20, 720);
  rect(1260, 0, 20, 720);

  fill(255, 8, 8);
  rect(0, 680, 40, 40);

  // vijand
    // imp
    fill(255, 8, 8);
    ellipse(impX, impY, 50, 50);

  // kogel

  // speler
  fill(8, 128, 255);
  ellipse(spelerX, spelerY, 50, 50);

  // punten en health

};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function () {
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm

  }
}
