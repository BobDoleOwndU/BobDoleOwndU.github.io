var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
 * This class is a button with predefined hover settings, so only click events need to be added
 * to finish its functionality.
 */
var objects;
(function (objects) {
    var Button = (function (_super) {
        __extends(Button, _super);
        //Constructor/////////////////////////////////////////////////////////////////////////////
        /*
         * This constructor creates buttons with the image and position provided.
         */
        function Button(stringPath, x, y) {
            _super.call(this, assetLoader.getResult(stringPath));
            //set the registration point to the centre of the button
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            //set the button at the position provided
            this.x = x;
            this.y = y;
            //set up event listeners for mouseover and mouseout
            this.addEventListener("mouseover", this._buttonOver);
            this.addEventListener("mouseout", this._buttonOut);
        } //constructor ends
        //Event Handlers//////////////////////////////////////////////////////////////////////////
        /*
         * This method sets the button to return to 100% opacity when the mouse leaves it.
         */
        Button.prototype._buttonOut = function (event) {
            event.currentTarget.alpha = 1.0;
        }; //method buttonOut ends
        /*
         * This method sets the button to have 50% opacity when the mouse is hovering on it.
         */
        Button.prototype._buttonOver = function (event) {
            event.currentTarget.alpha = 0.5;
        }; //method buttonOver ends
        return Button;
    })(createjs.Bitmap);
    objects.Button = Button; //class button ends
})(objects || (objects = {})); //module objects ends
//# sourceMappingURL=button.js.map