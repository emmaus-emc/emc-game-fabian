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

// keycodes
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

var spelerX = 640; // x-positie van speler
var spelerY = 560; // y-positie van speler
var spelerXSnelheid = 6; // x-snelheid van speler
var spelerYSnelheid = 6; // y-snelhied van speler

var vijandImpX // x-positie van vijand Imp
var vijandImpY // y-positie van vijand Imp
const vijandImpYSnelheid = 3; // y-snelheid van vijand Imp

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // vijand

    // imp
    vijandImpY = vijandImpY + vijandImpYSnelheid;

    if(vijandImpY > 800) {
      vijandImpY = random(-360, -80);
      vijandImpX = random(65, 1215);
    };


  // kogel

  // speler

    // normale beweging
    if(keyIsDown(ARROW_LEFT)) {
      spelerX -= spelerXSnelheid;
    };

    if(keyIsDown(ARROW_UP)) {
      spelerY -= spelerYSnelheid;
    };

    if(keyIsDown(ARROW_RIGHT)) {
      spelerX += spelerXSnelheid;
    };

    if(keyIsDown(ARROW_DOWN)) {
      spelerY += spelerYSnelheid;
    };
    
    // botsing detectie
    if(spelerX < 65) {
      spelerX = 65;
    };

    if(spelerX > 1215) {
      spelerX = 1215;
    };

    if(spelerY < 25) {
      spelerY = 25;
    };

    if(spelerY > 640) {
      spelerY = 640;
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
  fill("black");
  rect(0, 0, 40, 720);
  rect(1240, 0, 40, 720);

  stroke("black")

  // vijand
    // imp
    fill(255, 8, 8);
    ellipse(vijandImpX, vijandImpY, 50, 50);

  // kogel

  // speler
  fill(8, 128, 255);
  ellipse(spelerX, spelerY, 50, 50);

  // vuur
  noStroke();
  fill(255, 8, 8);
  for (var i = 0; i < 16; i++) {
    var vuurX = i * 80;
    rect(vuurX, 640, 80, 80);
  };
  
  stroke("black");

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
  // Teken de vijanden op willekurige plaatsen
    // Imp
    vijandImpX = random(65, 1215);
    vijandImpY = random(-360, -80);

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
