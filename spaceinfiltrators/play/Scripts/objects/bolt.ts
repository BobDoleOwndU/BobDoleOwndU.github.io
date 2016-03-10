/*
 * This class is a the alien equivelent of a bullet. The aliens will fire bolts at the player in
 * an attempt to destroy them.
 */
module objects {
    export class Bolt extends objects.GameObject {
        //Constructor/////////////////////////////////////////////////////////////////////////////
        /*
         * This constructor creates bolts at the position provided.
         */
        constructor(x: number, y: number) {
            super("bolt");

            //set the bolts position to the one provided
            this.x = x;
            this.y = y;
        } //constructor ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        /*
         * This method updates the bolt's position.
         */
        public update(): void {
            this.x -= 10; //move the bullet left 10 pixels
            //if the bolt is off the left of the stage...
            if (this.x < 0) {
                numberOfBolts--; //decrease the number of bolts in game
                bolts.splice(bolts.indexOf(this), 1); //remove the bolt from the bolts array
                stage.removeChild(this); //remove the bolt from the game
            } //if ends
        } //method update ends

        /*
         * This method removes the bolt when it collides with the tank.
         */
        public collide(): void {
            numberOfBolts--; //decrease the number of bolts in game
            bolts.splice(bolts.indexOf(this), 1); //remove the bolt from the bolts array
            stage.removeChild(this); //remove the bolt from the game
        } //method collide ends
    } //class Bullet ends
} //module objects ends 