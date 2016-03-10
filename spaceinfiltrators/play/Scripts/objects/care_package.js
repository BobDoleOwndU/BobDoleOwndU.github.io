var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
 * This class is a care package item in the game. The player receives 300 points upon colliding
 * with it.
 */
var objects;
(function (objects) {
    var CarePackage = (function (_super) {
        __extends(CarePackage, _super);
        //Constructor/////////////////////////////////////////////////////////////////////////////
        function CarePackage() {
            _super.call(this, "carePackage");
            //reset the care package to its default position
            this._reset();
        } //constructor ends
        //Private Methods/////////////////////////////////////////////////////////////////////////
        /*
         * This method resets the care packages position to be off the right of the stage with
         * a random y value.
         */
        CarePackage.prototype._reset = function () {
            this.x = 1280 + this.width; //move off the right of the stage
            this.y = Math.floor(Math.random() * 480); //set y to a random value between 0 and 480
        }; //method reset ends
        /*
         * This method checks if the carePackage has gone off the left of the stage and needs to
         * be reset.
         */
        CarePackage.prototype._checkBounds = function () {
            //if it is off the left of the screen...
            if (this.x < 0 - this.width) {
                this._reset(); //reset its position
            } //if ends
        }; //method checkBounds ends
        //Public Methods//////////////////////////////////////////////////////////////////////////
        /*
         * This method updates the care package's postion.
         */
        CarePackage.prototype.update = function () {
            this.x -= 5; //move the care package left 5 pixels
            this._checkBounds(); //check if it has gone off stage
        }; //method update ends
        /*
         * This method adds 300 points to the player's score when they collide with the care
         * package and resets the care package's position.
         */
        CarePackage.prototype.collide = function () {
            score += 300; //add 300 to score
            scoreText.text = score.toString(); //update the scoreText
            //play the carePackageNoise sound effect
            createjs.Sound.play("carePackageNoise");
            this._reset(); //reset the care package's position
        }; //method collide ends
        return CarePackage;
    })(objects.GameObject);
    objects.CarePackage = CarePackage; //class CarePackage ends
})(objects || (objects = {})); //module objects ends  
//# sourceMappingURL=care_package.js.map