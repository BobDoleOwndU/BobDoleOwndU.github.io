/*
 * This class is a bullet that the player fires at the aliens in an attempt to destroy them.
 */
module objects {
    export class Bullet extends objects.GameObject {
        //Constructor/////////////////////////////////////////////////////////////////////////////
        /*
         * This constructor creates bolts at the position provided.
         */
        constructor(x: number, y: number) {
            super("bullet");

            //set the bullet to the position provided
            this.x = x;
            this.y = y;
        } //constructor ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        /*
         * This method updates the bullet's position.
         */
        public update(): void {
            this.x += 10; //move the bullet right 10 pixels

            //if the bullet is off the right of the stage...
            if (this.x > 1280) {
                tank.bulletOnScreen = false; //set the tank to have no bullet on screen
                stage.removeChild(this); //remove the bullet from the game
            } //if ends
        } //method update ends

        /*
         * This method removes the bullet when it collides with an alien.
         */
        public collide(): void {
            tank.bulletOnScreen = false; //set the tank to have no bullet on screen 
            stage.removeChild(this); //remove the bullet from the game
        } //method collide ends
    } //class Bullet ends
} //module objects ends 