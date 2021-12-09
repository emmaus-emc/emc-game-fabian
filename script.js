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
const UITLEG = 3;
var spelStatus = UITLEG;

// plaatjes
var imgSpelerRifle = 0;
var imgVuur = 0;

// keycodes
const ENTER = 13;
const SPACE = 32;
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

// speler
var spelerX = 640; // x-positie van speler
var spelerY = 560; // y-positie van speler
var spelerXSnelheid = 8; // x-snelheid van speler
var spelerYSnelheid = 8; // y-snelhied van speler

// kogel
var kogelX = []; // x-positie van kogel
var kogelY = []; // y-positie van kogel
const kogelYSnelheid = 24; // y-snelheid van kogel

// vijanden

  // imp
  var aantalImpVijanden = 8; // aantal imp vijanden
  var vijandImpX = []; // x-positie van vijand Imp
  var vijandImpY = []; // y-positie van vijand Imp
  const vijandImpYSnelheid = 4; // y-snelheid van vijand Imp

// misc
var score = 0; // score

// hp
var healthPoints = 4; // aantal health points van de speler
var spelerGeraakt = false; // geeft "true" of "false" als de speler geraakt is

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // vijand

    // imp
    for (var i = 0; i < aantalImpVijanden; i++) {
      vijandImpY[i] = vijandImpY[i] + vijandImpYSnelheid;
    

      if (vijandImpY[i] > 800) {
        vijandImpX[i] = random(65, 1215);
        vijandImpY[i] = random(-360, -80);
      };
    };


  // kogel
  for (i = 0; i < kogelY.length; i++) {
    kogelY[i] -= kogelYSnelheid;
  };

  if (keyIsDown(SPACE)) {
    kogelX.push(spelerX);
    kogelY.push(spelerY);
  };

  // speler

    // normale beweging
    if (keyIsDown(ARROW_LEFT)) {
      spelerX -= spelerXSnelheid;
    };

    if (keyIsDown(ARROW_UP)) {
      spelerY -= spelerYSnelheid;
    };

    if (keyIsDown(ARROW_RIGHT)) {
      spelerX += spelerXSnelheid;
    };

    if (keyIsDown(ARROW_DOWN)) {
      spelerY += spelerYSnelheid;
    };
    
    // muur botsing detectie
    if (spelerX < 65) {
      spelerX = 65;
    };

    if (spelerX > 1215) {
      spelerX = 1215;
    };

    if (spelerY < 25) {
      spelerY = 25;
    };

    if (spelerY > 640) {
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
    // imp
    for (var i = 0; i < aantalImpVijanden; i++) {
      if ((vijandImpX[i] - spelerX) < 50  &&  (vijandImpX[i] - spelerX) > -50  &&  (vijandImpY[i] - spelerY) < 50  &&  (vijandImpY[i] - spelerY) > -50  &&  healthPoints > 0) {
        console.log("botsing speler-vijand");
        healthPoints--;
        vijandImpY[i] = vijandImpY[i] + 800;
      };
    };

  // botsing kogel tegen vijand
    // imp
    for (i = 0; i < aantalImpVijanden; i++) {
      if ((vijandImpX[i] - kogelX) < 29  &&  (vijandImpX[i] - kogelX) > -29  &&  (vijandImpY[i] - kogelY) < 50  &&  (vijandImpY[i] - kogelY) > -50) {
        console.log("botsing kogel-vijand");
        for (i = 0; i < kogelY.length; i++) {
          kogelX[i] = -64;
          kogelY[i] = -64;
        };
        vijandImpY[i] = vijandImpY[i] + 800;
      };
    };
  
  // botsing kogel tegen schermrand
    for (i = 0; i < kogelY.length; i++) {
      if (kogelY[i] < 4) {
        kogelX[i] = -64;
        kogelY[i] = -64;
      };
    };

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

  stroke("black");

  // vijand
    // imp
    fill(255, 8, 8);

    for (var i = 0; i < aantalImpVijanden; i++) {
      ellipse(vijandImpX[i], vijandImpY[i], 50, 50);
    };

  // kogel
  fill(255, 255, 8);
  for (i = 0; i < kogelY.length; i++) {
    ellipse(kogelX, kogelY[i], 8, 8);
  };

  
  // speler
  /*
  fill(8, 128, 255);
  ellipse(spelerX, spelerY, 50, 50);
  */
  image(imgSpelerRifle, spelerX - 35, spelerY - 40); // afmeting 70 x 70 (hitbox 50 x 50)

  // vuur
  noStroke();
  fill(255, 8, 8);
  for (var i = 0; i < 16; i++) {
    var vuurX = i * 80;
    image(imgVuur, vuurX, 640); // afmeting 80 x 80
  };
  
  stroke("black");

  // punten en health
    // punten
    fill(0, 0, 0);
    textSize(40);
    textAlign(LEFT);
    text("Score: " + score, 60, 55);

    score++;

    // health
    stroke("black");

    fill(255, 8, 8);
    for (var i = 0; i < healthPoints; i++) {
      var hpBarX = i * 160 + 320;
      rect(hpBarX, 580, 160, 40);
    };

    fill(160, 160, 160);
    for (var i = 0; i < (4 - healthPoints); i++) {
      var hpWegBarX = i * -160 + 800;
      rect(hpWegBarX, 580, 160, 40);
    };
};

/**
 * Tekent game-overscherm
 */
var tekenGameOver = function () {
  background('red');

  if (mouseX > 380  &&  mouseX < 900  &&  mouseY > 520  &&  mouseY < 640) {
    fill('yellow');
  } else {
    fill('orange');
  };
  rect(380, 520, 520, 120);

  textAlign(CENTER);
  fill(0, 0, 0);
  textSize(120);

  text("GAME OVER", 640, 360);

  textSize(80);

  text("Score: " + score, 640, 450);

  text("RESTART?", 640, 610);
};

/**
 * Verwerkt game-over
 */
var verwerkGameOver = function () {
  // restart wanneer speler op "RESTART?" drukt
  if ((mouseX > 380  &&  mouseX < 900  &&  mouseY > 520  &&  mouseY < 640  &&  mouseIsPressed)  ||  keyIsDown(SPACE)  ||  keyIsDown(ENTER)) {
    initSpel();
    spelStatus = SPELEN;
  };
};

/**
 * Teken uitlegscherm
 */
var tekenUitleg = function () {
  background('black');

  if (mouseX > 380  &&  mouseX < 900  &&  mouseY > 520  &&  mouseY < 640) {
    fill('white');
  } else {
    fill('gray');
  };
  rect(380, 520, 520, 120);

  textAlign(CENTER);
  fill(255, 255, 255);
  textSize(40);

  text("Jij bent de Doomtaker.", 640, 150);
  text("Je taak is om uit de hel te vluchten.", 640, 200);
  text("Er zijn veel monsters hier.", 640, 250);
  text("Success!", 640, 300);

  text("ARROW KEYS om te bewegen", 640, 400);
  text("SPACE om te schieten", 640, 450);

  fill(0, 0, 0);
  textSize(80);

  text("START!", 640, 610);
};

/**
 * Verwerkt uitleg
 */
var verwerkUitleg = function() {
  // start wanneer speler op "START!" drukt
  if (mouseX > 380  &&  mouseX < 900  &&  mouseY > 520  &&  mouseY < 640  &&  mouseIsPressed  ||  keyIsDown(SPACE)  ||  keyIsDown(ENTER)) {
    initSpel();
    spelStatus = SPELEN;
  };
};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function () {
  if (healthPoints <= 0) {
    return true;
  } else {
    return false;
  };
};

/**
 * zet spelvariabelen in beginstand
 */
var initSpel = function () {
  
  spelerX = 640; // x-positie van speler
  spelerY = 560; // y-positie van speler
  spelerXSnelheid = 8; // x-snelheid van speler
  spelerYSnelheid = 8; // y-snelhied van speler

  // Teken de vijanden op willekurige plaatsen
    // Imp
    vijandImpX = [random(65, 1215), random(65, 1215), random(65, 1215), random(65, 1215), random(65, 1215), random(65, 1215), random(65, 1215), random(65, 1215)];
    vijandImpY = [800, 800, 800, 800, 800, 800, 800, 800];

  score = 0; // score

  healthPoints = 4; // aantal health points van de speler
  spelerGeraakt = false; // geeft "true" of "false" als de speler geraakt is
};




/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * preload
 */
function preload() {
  imgSpelerRifle = loadImage('spelerRifle.png');
  imgVuur = loadImage('vuur.png');
};

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

  // Zet spelvariabelen naar beginstand
  initSpel();
};

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  // Spelen
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();

    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    };
  };

  // Game-over
  if (spelStatus === GAMEOVER) {
    tekenGameOver();
    verwerkGameOver();
  };

  // Uitleg
  if (spelStatus === UITLEG) {
    tekenUitleg();
    verwerkUitleg();
  };
};
