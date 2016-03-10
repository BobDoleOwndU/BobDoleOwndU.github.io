var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
 * This class is a the alien equivelent of a bullet. The aliens will fire bolts at the player in
 * an attempt to destroy them.
 */
var objects;
(function (objects) {
    var Bolt = (function (_super) {
        __extends(Bolt, _super);
        //Constructor/////////////////////////////////////////////////////////////////////////////
        /*
         * This constructor creates bolts at the position provided.
         */
        function Bolt(x, y) {
            _super.call(this, "bolt");
            //set the bolts position to the one provided
            this.x = x;
            this.y = y;
        } //constructor ends
        //Public Methods//////////////////////////////////////////////////////////////////////////
        /*
         * This method updates the bolt's position.
         */
        Bolt.prototype.update = function () {
            this.x -= 10; //move the bullet left 10 pixels
            //if the bolt is off the left of the stage...
            if (this.x < 0) {
                numberOfBolts--; //decrease the number of bolts in game
                bolts.splice(bolts.indexOf(this), 1); //remove the bolt from the bolts array
                stage.removeChild(this); //remove the bolt from the game
            } //if ends
        }; //method update ends
        /*
         * This method removes the bolt when it collides with the tank.
         */
        Bolt.prototype.collide = function () {
            numberOfBolts--; //decrease the number of bolts in game
            bolts.splice(bolts.indexOf(this), 1); //remove the bolt from the bolts array
            stage.removeChild(this); //remove the bolt from the game
        }; //method collide ends
        return Bolt;
    })(objects.GameObject);
    objects.Bolt = Bolt; //class Bullet ends
})(objects || (objects = {})); //module objects ends 
//# sourceMappingURL=bolt.js.map