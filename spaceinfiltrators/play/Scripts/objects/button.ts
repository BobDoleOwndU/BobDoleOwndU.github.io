/*
 * This class is a button with predefined hover settings, so only click events need to be added
 * to finish its functionality.
 */
module objects {
    export class Button extends createjs.Bitmap {
        //Constructor/////////////////////////////////////////////////////////////////////////////
        /*
         * This constructor creates buttons with the image and position provided.
         */
        constructor(stringPath: string, x: number, y: number) {
            super(assetLoader.getResult(stringPath));

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
        private _buttonOut(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 1.0;
        } //method buttonOut ends

        /*
         * This method sets the button to have 50% opacity when the mouse is hovering on it.
         */
        private _buttonOver(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 0.5;
        } //method buttonOver ends
    } //class button ends
} //module objects ends