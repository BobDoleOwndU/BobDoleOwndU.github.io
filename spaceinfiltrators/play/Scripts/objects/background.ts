/*
 * This class acts as a scrolling background for each of the game's screens.
 */
module objects {
    export class Background extends createjs.Bitmap {

        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super(assetLoader.getResult("background"));

            //reset the background to its initial position
            this._reset();
        } //constructor endss

        //Private Methods/////////////////////////////////////////////////////////////////////////
        /*
         * This method sets the background back to its original position.
         */
        private _reset(): void {
            this.x = 0;
            this.y = 0;
        } //method reset ends

        /*
         * This method checks if the background has reached the end of its width and needs to be
         * reset.
         */
        private _checkBounds(): void {
            if (this.x <= -640) {
                this._reset();
            } //if ends
        } //method checkBounds ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        /*
         * This method update's the background's position.
         */
        public update(): void {
            this.x -= 5; //move the background left 5 pixels

            this._checkBounds(); //check if the background needs to be reset.
        } //method update ends
    } //class Plane ends
} //module objects ends   