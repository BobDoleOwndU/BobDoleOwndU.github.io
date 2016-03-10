var states;
(function (states) {
    /*
     * This function loops and updates the game as it is being played.
     */
    function playState() {
        tank.update(); //updates tank's position
        carePackage.update(); //updates carePackage's position
        background.update(); //updates ocean's position
        //check if the tank and carePackage collided
        //tank doesn't take damage, carePackage does
        checkCollision(tank, false, carePackage, true);
        //if the tank's bullet is onscreen...
        if (tank.bulletOnScreen) {
            tank.bullet.update(); //refresh its position
        } //if ends
        //check if any aliens have hit the top or bottom of the stage
        for (var alien = numberOfAliens - 1; alien >= 0; alien--) {
            if (aliens[alien].hitside) {
                aliensMove(); //if they have, call aliensMove
            } //if ends
        } //for ends
        //update the aliens' positions, check if the aliens have collided with the tank or with a 
        //bullet and check if the tank is in firing range of the aliens
        for (var alien = numberOfAliens - 1; alien >= 0; alien--) {
            aliens[alien].update(); //updates aliens' position
            //if an alien has gone off the left of the stage...
            if (aliens[alien].x < 0) {
                missionOutcome = "Mission Failed"; //set mission outcome to Mission Failed
                //switch to the game over state
                currentState = constants.GAME_OVER_STATE;
                changeState(currentState);
            } //if ends
            aliens[alien].checkTarget(); //check if the tank is in firing range
            //check if the tank and alien have collided
            //tank takes damage, the alien does not
            checkCollision(tank, true, aliens[alien], false);
            //if the bullet is onscreen...
            if (tank.bulletOnScreen) {
                //check if the alien collided with it
                checkCollision(tank.bullet, true, aliens[alien], true);
            } //if ends
        } //for ends
        //update each bolt's position and check if it has collidied with the tank
        for (var bolt = numberOfBolts - 1; bolt >= 0; bolt--) {
            bolts[bolt].update(); //update the bolt's position
            //only check for collision if the bolt wasn't removed from the game in its update
            if (bolts[bolt] != null) {
                //check if it collided with the tank
                checkCollision(tank, true, bolts[bolt], true);
            } //if ends
        } //for ends
        //check each explosion to see if its time has passed for staying on screen
        for (var explosion = numberOfExplosions - 1; explosion >= 0; explosion--) {
            explosions[explosion].checkTime(); //check if it should stay on screen
        } //for ends
        //if the tank has run out of health
        if (tank.health < 1) {
            missionOutcome = "Mission Failed"; //set missionOutcome to Mission Failed
            //change to the game over state
            currentState = constants.GAME_OVER_STATE;
            changeState(currentState);
        } //if ends
        //if there are no aliens left...
        if (numberOfAliens < 1) {
            score += 5000; //add 5000 points to the score
            missionOutcome = "Mission Complete!"; //set missionOutcome to Mission Complete!
            //change to the game over state
            currentState = constants.GAME_OVER_STATE;
            changeState(currentState);
        } //if ends
    }
    states.playState = playState; //function playState ends
    /*
     * This function sets up the game, creating and placing the game objects and variables
     */
    function play() {
        //clear the stage
        stage.removeAllChildren();
        stage.removeAllEventListeners();
        //set 45 aliens to appear in the game
        numberOfAliens = constants.NUMB_ALIENS;
        //initialize the number of explosions to 0
        numberOfExplosions = 0;
        //initialize the bolts of explosions to 0
        numberOfBolts = 0;
        //initialize score to 0
        score = 0;
        //add background to game
        background = new objects.Background();
        stage.addChild(background);
        //add island to game
        carePackage = new objects.CarePackage();
        stage.addChild(carePackage);
        //add tank to game
        tank = new objects.Tank();
        stage.addChild(tank);
        //add aliens to game
        //numberOfAliens - 1 is necessary to avoid leaving an empty space in the array
        for (var alien = numberOfAliens - 1; alien >= 0; alien--) {
            //aliens will appear in rows of 9
            aliens[alien] = new objects.Alien(1184 + (32 * (Math.floor(alien / 9))), (32 * (alien % 9)));
            stage.addChild(aliens[alien]); //add the alien to the game
        } //for ends
        //add the scoreboard to the game
        scoreBoard = new createjs.Bitmap("/spaceinfiltrators/play/assets/images/score_board.png");
        scoreBoard.y = 480;
        stage.addChild(scoreBoard);
        //add text elements to the game
        healthText = new createjs.Text(tank.health.toString(), "24px Arial", "White");
        healthText.x = 76;
        healthText.y = 512;
        stage.addChild(healthText);
        aliensText = new createjs.Text(numberOfAliens.toString(), "24px Arial", "White");
        aliensText.x = 76;
        aliensText.y = 541;
        stage.addChild(aliensText);
        scoreText = new createjs.Text(score.toString(), "24px Arial", "White");
        scoreText.x = 76;
        scoreText.y = 570;
        stage.addChild(scoreText);
        //set up the game for keyboard input
        //this section checks which key was pressed
        document.addEventListener("keydown", function (event) {
            event.preventDefault(); //stops the page from scrolling down when space is pressed
            tank.actionStart(event.keyCode); //send the tank the key that was pressed
        });
        //this section checks which key was released
        document.addEventListener("keyup", function (event) {
            tank.actionEnd(event.keyCode); //send the tank the key that was pressed
        });
        //play the song, looped infinitely
        createjs.Sound.play("song", { loop: -1 });
    }
    states.play = play; //function play ends
    /*
     * This function calculates the distance between two points.
     */
    function distance(p1, p2) {
        return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
    } //function distance ends
    /*
     * This function checks for collisions between two game objects.
     */
    function checkCollision(collider1, takesDamage1, collider2, takesDamage2) {
        //create points for each of the objects positions
        var p1 = new createjs.Point();
        var p2 = new createjs.Point();
        //set p1's x and y to collider1's x and y
        p1.x = collider1.x;
        p1.y = collider1.y;
        //set p2's x and y to collider2's x and y
        p2.x = collider2.x;
        p2.y = collider2.y;
        //if the distance of the 2 points is less than half the width of the two objects added,
        //a collision has occured
        if (distance(p2, p1) < ((collider1.width * 0.5) + (collider2.width * 0.5))) {
            //if neither object was already colliding...
            if (!collider1.isColliding && !collider2.isColliding) {
                //set each object to be colliding
                collider1.isColliding = true;
                collider2.isColliding = true;
                //if the first objects takes damage from the collision...
                if (takesDamage1) {
                    collider1.collide(); //call its collide method
                } //if ends
                //if the second objects takes damage from the collision...
                if (takesDamage2) {
                    collider2.collide(); //call its collide method
                } //if ends
            } //if ends
        } //if ends
        else {
            //set each object to not be colliding
            collider1.isColliding = false;
            collider2.isColliding = false;
        } //else ends
    } //function play ends
    /*
    * This function tells each alien to start moving forward once one alien's hitSide variable has
    * been triggered.
    */
    function aliensMove() {
        //call each alien's moveForward method
        for (var alien = numberOfAliens - 1; alien >= 0; alien--) {
            aliens[alien].moveForward();
        } //for ends
    } //function aliensMove ends
})(states || (states = {})); //module states ends
//# sourceMappingURL=play.js.map