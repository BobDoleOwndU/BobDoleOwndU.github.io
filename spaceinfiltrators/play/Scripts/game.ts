/*
* Space Infiltrators
*
* Author: BobDoleOwndU
* Last Modified By: BobDoleOwndU
* Date Last Modified: March 20th 2015
*
* Description: This game is a javascript remake of Space Invaders. The player controls a tank
* which can fire bullets at aliens moving towards the player. The player can only have 1 bullet
* on the stage at any time. The aliens move downwards or upwards until they hit the edge of the
* stage; upon hitting the edge they will move left and then begin going the opposite direction of
* the one they were going when they hit the edge. The aliens may fire bolts at the player if
* they are in range. The player's goal is to destroy all of the aliens before they get to the
* player.
*
* Revision History:
* v0.1:
* -Created base game.
*
* v0.2:
* -Changed controls from mouse input to keyboard input.
*
* v0.3:
* -Added and implemented gameObject class.
*
* v0.4:
* -Added methods for collision detection and handling.
*
* v0.5:
* -Added firing mechanic to the tank class.
* -Added a song to the game.
*
* v0.6:
* -Added explosion object to the game, for use on collisions.
*
* v0.7:
* -AI for alien's movement complete.
*
* v0.8:
* -Added more aliens to the game.
* -Adjusted speed increase on remaining aliens when an alien is destroyed.
*
* v0.9:
* -Added firing mechanic for the aliens.
*
* v0.10:
* -Added some internal documentation.
*
* v0.11:
* -Fixed errors caused by objects being destroyed before attempting to call one of their methods.
* -Replaced ocean background with a desert background (animation and renaming of class still
* required).
*
* v0.12:
* -Implemented game state system.
*
* v0.13:
* -Added menu to the game (with a working start button).
* -Renamed eveything that said "ocean" to "background."
*
* v0.14:
* -Added an instructions screen to the game.
*
* v0.15:
* -Added a game over screen.
* -implemented scoring system.
* -Added care package object to the game (for bonus points).
*
* v0.16:
* -Added Score, aliens (remaining) and health display to the main game.
* -Added second instruction screen to explain scoring and a couple tips.
*
* v0.17:
* -Added and implemented button class.
* 
* v0.18:
* -Added again button on the game over screen.
* 
* v1.0:
* -Added sound effects.
* -Changed tank sprite to make sense with the scolling background.
* -Finished game.
* 
* v1.1:
* -Finished internal Documentation.
* 
* v1.2:
* -Removed empty fonts folder.
*/
/// <reference path="../../../Scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../../../Scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../../../Scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../../../Scripts/typings/soundjs/soundjs.d.ts" />
/// <reference path="../../../Scripts/typings/preloadjs/preloadjs.d.ts" />
/// <reference path="constants.ts" />
/// <reference path="objects/game_object.ts" />
/// <reference path="objects/alien.ts" />
/// <reference path="objects/care_package.ts" />
/// <reference path="objects/background.ts" />
/// <reference path="objects/tank.ts" />
/// <reference path="objects/bullet.ts" />
/// <reference path="objects/bolt.ts" />
/// <reference path="objects/explosion.ts" />
/// <reference path="objects/button.ts" />
/// <reference path="states/play.ts" />
/// <reference path="states/menu.ts" />
/// <reference path="states/game_over.ts" />
/// <reference path="states/instructions.ts" />

//Canvas and Asset Objects
var canvas;
var stage: createjs.Stage;
var assetLoader;

//Game Objects and Variables
var tank: objects.Tank;
var carePackage: objects.CarePackage;
var aliens: objects.Alien[] = [];
var background: objects.Background;
var numberOfAliens: number;
var explosions: objects.Explosion[] = [];
var numberOfExplosions: number;
var bolts: objects.Bolt[] = [];
var numberOfBolts: number;
var startButton: objects.Button;
var instructionsButton: objects.Button;
var nextButton: objects.Button;
var againButton: objects.Button;
var menuScreen: createjs.Bitmap;
var instructionsScreen: createjs.Bitmap;
var instructionsScreen2: createjs.Bitmap;
var scoreBoard: createjs.Bitmap;
var score: number;
var scoreText: createjs.Text;
var healthText: createjs.Text;
var aliensText: createjs.Text;
var missionOutcome: string;
var missionOutcomeText: createjs.Text;

//state objects
var currentState: number;
var currentStateFunction: any;

//asset manifest - array of asset objects
var manifest = [
    { id: "alien", src: "/spaceinfiltrators/play/assets/images/alien.png" },
    { id: "carePackage", src: "/spaceinfiltrators/play/assets/images/care_package.png" },
    { id: "background", src: "/spaceinfiltrators/play/assets/images/background.png" },
    { id: "tank", src: "/spaceinfiltrators/play/assets/images/tank.png" },
    { id: "bullet", src: "/spaceinfiltrators/play/assets/images/bullet.png" },
    { id: "explosion", src: "/spaceinfiltrators/play/assets/images/explosion.png" },
    { id: "bolt", src: "/spaceinfiltrators/play/assets/images/bolt.png" },
    { id: "song", src: "/spaceinfiltrators/play/assets/audio/conquest.ogg" },
    { id: "bulletNoise", src: "/spaceinfiltrators/play/assets/audio/bullet_noise.ogg" },
    { id: "boltNoise", src: "/spaceinfiltrators/play/assets/audio/bolt_noise.ogg" },
    { id: "explodeNoise", src: "/spaceinfiltrators/play/assets/audio/explode_noise.ogg" },
    { id: "carePackageNoise", src: "/spaceinfiltrators/play/assets/audio/care_package_noise.ogg"},
    { id: "startButton", src: "/spaceinfiltrators/play/assets/images/start_button.png" },
    { id: "instructionsButton", src: "/spaceinfiltrators/play/assets/images/instructions_button.png" },
    { id: "nextButton", src: "/spaceinfiltrators/play/assets/images/next_button.png" },
    { id: "againButton", src: "/spaceinfiltrators/play/assets/images/again_button.png"}
];

/*
 * This function preloads all of the assets in the game, making it ready before the game is
 * launched.
 */
function preload() {
    assetLoader = new createjs.LoadQueue(); // instantiated assetLoader
    assetLoader.installPlugin(createjs.Sound);
    assetLoader.on("complete", init, this); // event handler-triggers when loading done
    assetLoader.loadManifest(manifest); // loading my asset manifest
} //function preload ends

/*
 * This function initializes the game by setting up the canvas, FPS, enabling mouseover and
 * setting the state to the menu.
 */
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    //change to the menu
    currentState = constants.MENU_STATE;
    changeState(currentState);
} //function init ends

/*
 * This function loops and updates the game as it is being played.
 */
function gameLoop() {
    currentStateFunction();
    stage.update(); // Refreshes our stage
} //function gameLoop ends

/*
 * This function switches the game between states.
 */
function changeState(state) {
    switch (state) {
        case constants.MENU_STATE:
            //instantiate menu screen
            currentStateFunction = states.menuState;
            states.menu();
            break;
        case constants.PLAY_STATE:
            //instantiate play screen
            currentStateFunction = states.playState;
            states.play();
            break;
        case constants.GAME_OVER_STATE:
            //instantiate game over screen
            currentStateFunction = states.gameOverState;
            states.gameOver();
            break;
            //instantiate instructions screen
        case constants.INSTRUCTIONS_STATE:
            currentStateFunction = states.instructionsState;
            states.instructions();
            break;
    } //switch ends
} //function changeState ends