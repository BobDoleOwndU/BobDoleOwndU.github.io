var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
 * This class is the tank controlled by the player. The player moves it with the 'W' and 'S' keys
 * on their keyboard, and launches bullets by pressing 'space'.
 */
var objects;
(function (objects) {
    var Tank = (function (_super) {
        __extends(Tank, _super);
        //Constructor/////////////////////////////////////////////////////////////////////////////
        /*
         * This constructor creates tanks at the centre of the stage with 3 health.
         */
        function Tank() {
            _super.call(this, "tank");
            this.health = constants.PLAYER_HEALTH;
            //set the tank's initial position
            this.x = 48;
            this.y = 240;
        } //constructor ends
        //Public Methods//////////////////////////////////////////////////////////////////////////
        /*
         * This method update's the tank's position.
         */
        Tank.prototype.update = function () {
            //if the tank is moving up... 
            if (this._movingUp) {
                this.y -= 5; //move the tank up 5 pixels
                //if the tank is off of the top of the stage
                if (this.y < -16) {
                    this.y = 496; //place it at the bottom of the screen
                } //if ends
            } //if ends
            else if (this._movingDown) {
                this.y += 5; //move the tank down 5 pixels
                //if the tank is off the bottom of the stage
                if (this.y > 496) {
                    this.y = -16; //move it to the top of the stage
                } //if ends
            } //else if ends
        }; //method update ends
        /*
         * This method checks which key was pressed and does an action based on it.
         */
        Tank.prototype.actionStart = function (key) {
            //if the W key was pressed...
            if (key == 87) {
                this._movingUp = true; //set movingUp to true
            } //if ends
            else if (key == 83) {
                this._movingDown = true; ///set movingDown to true
            } //else if ends
            //else if the Space Bar was pressed
            if (key == 32) {
                this.fire(); //fire!
            } //if ends
        }; //method startMoving ends
        /*
         * This method stops the tank from moving up or down when the relevent key is released.
         */
        Tank.prototype.actionEnd = function (key) {
            //if the W key was released...
            if (key == 87) {
                this._movingUp = false; //set movingUp to false
            } //if ends
            else if (key == 83) {
                this._movingDown = false; //set movingDown to false
            } //if ends
        }; //method startMoving ends
        /*
         * This method fires a bullet from the tank's current position if there isn't a bullet
         * already on screen.
         */
        Tank.prototype.fire = function () {
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
        }; //method fire ends
        /*
         * This method decreases the tank's health when they collide with a bolt or an alien.
         */
        Tank.prototype.collide = function () {
            this.health--; //decrease health
            healthText.text = this.health.toString();
        }; //method collide ends
        return Tank;
    })(objects.GameObject);
    objects.Tank = Tank; //class Tank ends
})(objects || (objects = {})); //module objects ends 
//# sourceMappingURL=tank.js.map