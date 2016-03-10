/*
 * This class acts as a base for most other in game objects.
 */
module objects {
    export class GameObject extends createjs.Bitmap {
        //instance variables
        public width: number;
        public height: number;
        public isColliding: boolean;

        //Constructor/////////////////////////////////////////////////////////////////////////////
        /*
         * This constructor sets the basic values needed by every game object.
         */
        constructor(assetString: string) {
            super(assetLoader.getResult(assetString)); //load the image from the string provided

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
        public collide(): void {
        } //method collide ends
    } //class gameObject ends
} //module objects ends   