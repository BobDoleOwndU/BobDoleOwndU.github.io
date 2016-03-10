/*
 * This class is the tank controlled by the player. The player moves it with the 'W' and 'S' keys
 * on their keyboard, and launches bullets by pressing 'space'.
 */
module objects {
    export class Tank extends objects.GameObject{

        //instance variables
        private _movingUp: boolean;
        private _movingDown: boolean;
        public health: number;
        public bullet: objects.Bullet;
        public bulletOnScreen: boolean;

        //Constructor/////////////////////////////////////////////////////////////////////////////
        /*
         * This constructor creates tanks at the centre of the stage with 3 health.
         */
        constructor() {
            super("tank");

            this.health = constants.PLAYER_HEALTH;

            //set the tank's initial position
            this.x = 48;
            this.y = 240;
        } //constructor ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        /*
         * This method update's the tank's position.
         */
        public update(): void {
            //if the tank is moving up... 
            if (this._movingUp) {
                this.y -= 5; //move the tank up 5 pixels

                //if the tank is off of the top of the stage
                if (this.y < -16) {
                    this.y = 496; //place it at the bottom of the screen
                } //if ends
            } //if ends
            //else if the tank is moving down...
            else if (this._movingDown) {
                this.y += 5; //move the tank down 5 pixels

                //if the tank is off the bottom of the stage
                if (this.y > 496) {
                    this.y = -16; //move it to the top of the stage
                } //if ends
            } //else if ends
        } //method update ends

        /*
         * This method checks which key was pressed and does an action based on it.
         */
        public actionStart(key): void {
            //if the W key was pressed...
            if (key == 87) {
                this._movingUp = true; //set movingUp to true
            } //if ends

            //else if the S key was pressed...
            else if (key == 83) {
                this._movingDown = true; ///set movingDown to true
            } //else if ends

            //else if the Space Bar was pressed
            if (key == 32) {
                this.fire(); //fire!
            } //if ends
        } //method startMoving ends

        /*
         * This method stops the tank from moving up or down when the relevent key is released.
         */
        public actionEnd(key): void {
            //if the W key was released...
            if (key == 87) {
                this._movingUp = false; //set movingUp to false
            } //if ends

            //else if the S key was released...
            else if (key == 83) {
                this._movingDown = false; //set movingDown to false
            } //if ends
        } //method startMoving ends

        /*
         * This method fires a bullet from the tank's current position if there isn't a bullet
         * already on screen.
         */
        public fire(): void {
            //if there is no bullet on screen...
            if (!this.bulletOnScreen) {
                //play the bulletNoise sound effect
                createjs.Sound.play("bulletNoise");

                //create the bullet at the tank's current position
                this.bullet = new objects.Bullet(this.x, this.y);

                //add the bullet to the game
                stage.addChild(this.bullet);

                this.bulletOnScreen = true; //set bulletOnScreen to true
            } //if ends
        } //method fire ends

        /*
         * This method decreases the tank's health when they collide with a bolt or an alien.
         */
        public collide(): void {
            this.health--; //decrease health
            healthText.text = this.health.toString();
        } //method collide ends
    } //class Tank ends
} //module objects ends 