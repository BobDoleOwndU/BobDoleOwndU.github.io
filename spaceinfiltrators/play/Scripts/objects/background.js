var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
 * This class acts as a scrolling background for each of the game's screens.
 */
var objects;
(function (objects) {
    var Background = (function (_super) {
        __extends(Background, _super);
        //Constructor/////////////////////////////////////////////////////////////////////////////
        function Background() {
            _super.call(this, assetLoader.getResult("background"));
            //reset the background to its initial position
            this._reset();
        } //constructor endss
        //Private Methods/////////////////////////////////////////////////////////////////////////
        /*
         * This method sets the background back to its original position.
         */
        Background.prototype._reset = function () {
            this.x = 0;
            this.y = 0;
        }; //method reset ends
        /*
         * This method checks if the background has reached the end of its width and needs to be
         * reset.
         */
        Background.prototype._checkBounds = function () {
            if (this.x <= -640) {
                this._reset();
            } //if ends
        }; //method checkBounds ends
        //Public Methods//////////////////////////////////////////////////////////////////////////
        /*
         * This method update's the background's position.
         */
        Background.prototype.update = function () {
            this.x -= 5; //move the background left 5 pixels
            this._checkBounds(); //check if the background needs to be reset.
        }; //method update ends
        return Background;
    })(createjs.Bitmap);
    objects.Background = Background; //class Plane ends
})(objects || (objects = {})); //module objects ends   
//# sourceMappingURL=background.js.map