var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
 * This class is a bullet that the player fires at the aliens in an attempt to destroy them.
 */
var objects;
(function (objects) {
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        //Constructor/////////////////////////////////////////////////////////////////////////////
        /*
         * This constructor creates bolts at the position provided.
         */
        function Bullet(x, y) {
            _super.call(this, "bullet");
            //set the bullet to the position provided
            this.x = x;
            this.y = y;
        } //constructor ends
        //Public Methods//////////////////////////////////////////////////////////////////////////
        /*
         * This method updates the bullet's position.
         */
        Bullet.prototype.update = function () {
            this.x += 10; //move the bullet right 10 pixels
            //if the bullet is off the right of the stage...
            if (this.x > 1280) {
                tank.bulletOnScreen = false; //set the tank to have no bullet on screen
                stage.removeChild(this); //remove the bullet from the game
            } //if ends
        }; //method update ends
        /*
         * This method removes the bullet when it collides with an alien.
         */
        Bullet.prototype.collide = function () {
            tank.bulletOnScreen = false; //set the tank to have no bullet on screen 
            stage.removeChild(this); //remove the bullet from the game
        }; //method collide ends
        return Bullet;
    })(objects.GameObject);
    objects.Bullet = Bullet; //class Bullet ends
})(objects || (objects = {})); //module objects ends 
//# sourceMappingURL=bullet.js.map