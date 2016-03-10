/*
 * This class is the aliens in the game, the enemy. They move downwards and upwards, moving
 * forward upon hitting the edge of the stage. They may fire bolts at the player if the player is 
 * in their shooting range.
 */
module objects {
    export class Alien extends objects.GameObject {
        //instance variables
        private _goalX: number;
        private _movingForward: boolean;
        private _coolDownPeriod: number;
        public speed: number;
        public hitside: boolean;
        
        //Constructor/////////////////////////////////////////////////////////////////////////////
        /*
         * This constructor creates alien objects, initializing their position to the one
         * provided.
         */
        constructor(x: number, y: number) {
            super("alien");

            //set the position to the one provided.
            this.x = x;
            this.y = y;

            //set their initial speed to 1 pixel per update.
            this.speed = 1;

            //initialize the cooldown variable, this forces the alien to wait 5 seconds between
            //shots
            this._coolDownPeriod = 0;

            //set hitside to false, since the alien has not hit the side of the screen yet
            this.hitside = false;

            //set movingForward to false, the alien will start off moving downward
            this._movingForward = false;
        } //constructor ends

        //Private Methods/////////////////////////////////////////////////////////////////////////
        /*
         * This method checks if the alien is going off stage, if so trigger the hitside variable
         * to let itself and all other aliens know to move forward.
         */
        private _checkBounds(): void {
            //if the alien hits the top or bottom of the stage...
            if (this.y < 0 || this.y > 480) {
                this.hitside = true; //set hitside to true
            } //if ends
        } //method checkBounds ends

        /*
         * This method has a 1% chance to create a bolt object at the alien's position.
         */
        private _fire() {
            //if a random number between 1 and 100 is equal to 1...
            if (Math.floor(Math.random() * 100 + 1) == 1) {
                //if the current time is greater than the end of the cooldown period...
                if (Date.now() > this._coolDownPeriod) {
                    //set the cooldown period for 5 seconds
                    this._coolDownPeriod = Date.now() + 5000;

                    //play the boltNoise sound effect
                    createjs.Sound.play("boltNoise");

                    //create a new bolt at the alien's current position
                    bolts[numberOfBolts] = new objects.Bolt(this.x, this.y);

                    //add the bolt to the stage
                    stage.addChild(bolts[numberOfBolts]);

                    //increase the current number of bolts
                    numberOfBolts++;
                } //if ends
            } //if ends
        } //method fire ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        /*
         * This method updates the alien's position
         */
        public update(): void {
            //if the alien is moving forward...
            if (this._movingForward) {
                //if the alien's speed is greater than 0...
                if (this.speed > 0) {
                    this.x -= this.speed; //subtract the speed from x
                } //if ends
                //if its speed is not greater than 0...
                else {
                    this.x += this.speed; //add the speed to x
                } //else ends

                //if when moving forward, the alien has reached its goal...
                if (this.x <= this._goalX) {
                    this._movingForward = false; //stop moving forward
                    this.changeDirection(); //change direction
                } //if ends
            } //if ends

            //if it is not moving forward...
            else {
                this.y += this.speed; //add speed to y

                this._checkBounds(); //check if the alien is still on stage
            } //else ends
        } //method update ends

        /*
         * This method tells the alien to start moving forward instead of up or down.
         */
        public moveForward() {
            this.hitside = false; //set hitside to false
            this._movingForward = true; //set movingForward to true
            this._goalX = this.x - 32; //set the goal x for the current x - 32
        } //method moveForward ends

        /*
         * This method reverses the aliens from down to up and vice-versa
         */
        public changeDirection(): void {
            this.speed *= -1; //multiply the speed by -1 to reverse the direction
        } //method reset ends

        /*
         * This method checks if the tank is in firing range of the alien
         */
        public checkTarget() {
            //if the tank is within 32 pixels of the centre of the alien...
            if (tank.y - this.y <= 16 && tank.y - this.y >= -16) {
                this._fire(); //fire!
            } //if ends
        } //method checkTarget ends

        /*
         * This method carries out the actions to be taken upon the alien colliding with the tank
         * or a bullet.
         */
        public collide(): void {
            //add to the score based on how far away the alien was
            score += Math.floor(this.x);
            scoreText.text = score.toString();

            //play the explodeNoise sound effect
            createjs.Sound.play("explodeNoise");

            //create an explosion at the place the collision occured
            explosions[numberOfExplosions] = new objects.Explosion(this.x, this.y);
            stage.addChild(explosions[numberOfExplosions]);
            numberOfExplosions++; //increase the number of explosions

            //remove alien from the array
            aliens.splice(aliens.indexOf(this), 1);

            //decrease the number of aliens, to account for the alien being removed
            numberOfAliens--;

            //update the aliensText with the new number
            aliensText.text = numberOfAliens.toString();

            //for each remaining alien in the game increase its speed by 2%; if it's the last 
            //alien, increase its speed by 400%!
            for (var alien = numberOfAliens - 1; alien >= 0; alien--) {
                if (numberOfAliens > 1) {
                    aliens[alien].speed *= 1.02;
                } //if ends
                else {
                    aliens[alien].speed *= 4;
                } //else ends
            } //for ends

            //remove the alien from the stage
            stage.removeChild(this);
        } //method collide ends
    } //class Alien ends
} //module objects ends   