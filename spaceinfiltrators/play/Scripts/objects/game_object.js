var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
 * This class acts as a base for most other in game objects.
 */
var objects;
(function (objects) {
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        //Constructor/////////////////////////////////////////////////////////////////////////////
        /*
         * This constructor sets the basic values needed by every game object.
         */
        function GameObject(assetString) {
            _super.call(this, assetLoader.getResult(assetString)); //load the image from the string provided
            this.width = this.getBounds().width; //set the width of the object
            this.height = this.getBounds().height; //set the height of the object
            //set the x and y values to be in the centre of the graphic
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            this.isColliding = false; //set is colliding to false
        } //constructor ends
        //Empty Methods///////////////////////////////////////////////////////////////////////////
        /*
         * This method acts as a placeholder for a collision event, it will be overridden and
         * defined in each gameObject.
         */
        GameObject.prototype.collide = function () {
        }; //method collide ends
        return GameObject;
    })(createjs.Bitmap);
    objects.GameObject = GameObject; //class gameObject ends
})(objects || (objects = {})); //module objects ends   
//# sourceMappingURL=game_object.js.map