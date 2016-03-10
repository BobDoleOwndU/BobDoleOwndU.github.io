var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
 * This class is an explosion which is placed wherever an alien is destroyed.
 */
var objects;
(function (objects) {
    var Explosion = (function (_super) {
        __extends(Explosion, _super);
        //Constructor/////////////////////////////////////////////////////////////////////////////
        /*
         * This constructor creates explosion objects at the position provided.
         */
        function Explosion(x, y) {
            _super.call(this, assetLoader.getResult("explosion"));
            //set the x and y positions to be in the middle of the graphic
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().width * 0.5;
            //set the explosion to the position provided
            this.x = x;
            this.y = y;
            //set timeEnd to be 1 second from the explosions creation
            this._timeEnd = Date.now() + 1000;
        } //constructor ends
        //Public Methods//////////////////////////////////////////////////////////////////////////
        /*
         * This method checks if enough time has passed to remove the explosion.
         */
        Explosion.prototype.checkTime = function () {
            //if more than 1 second has passed...
            if (Date.now() > this._timeEnd) {
                //remove the explosion from the explosions array
                explosions.splice(explosions.indexOf(this), 1);
                stage.removeChild(this); //remove the explosion from the game
                numberOfExplosions--; //decrease the number of explosions in game
            } //if ends
        }; //method checkTime ends
        return Explosion;
    })(createjs.Bitmap);
    objects.Explosion = Explosion; //class explosion ends
})(objects || (objects = {})); //module objects ends
//# sourceMappingURL=explosion.js.map