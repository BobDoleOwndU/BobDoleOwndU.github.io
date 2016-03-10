/*
 * This class is a care package item in the game. The player receives 300 points upon colliding
 * with it.
 */
module objects {
    export class CarePackage extends objects.GameObject {
        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super("carePackage");

            //reset the care package to its default position
            this._reset();
        } //constructor ends

        //Private Methods/////////////////////////////////////////////////////////////////////////
        /*
         * This method resets the care packages position to be off the right of the stage with
         * a random y value.
         */
        private _reset() {
            this.x = 1280 + this.width; //move off the right of the stage
            this.y = Math.floor(Math.random() * 480); //set y to a random value between 0 and 480
        } //method reset ends

        /*
         * This method checks if the carePackage has gone off the left of the stage and needs to
         * be reset.
         */
        private _checkBounds() {
            //if it is off the left of the screen...
            if (this.x < 0 - this.width) {
                this._reset(); //reset its position
            } //if ends
        } //method checkBounds ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        /*
         * This method updates the care package's postion.
         */
        public update(): void {
            this.x -= 5; //move the care package left 5 pixels

            this._checkBounds(); //check if it has gone off stage
        } //method update ends

        /*
         * This method adds 300 points to the player's score when they collide with the care
         * package and resets the care package's position.
         */
        public collide(): void {
            score += 300; //add 300 to score
            scoreText.text = score.toString(); //update the scoreText

            //play the carePackageNoise sound effect
            createjs.Sound.play("carePackageNoise");

            this._reset(); //reset the care package's position
        } //method collide ends
    } //class CarePackage ends
} //module objects ends  