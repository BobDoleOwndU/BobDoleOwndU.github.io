module states {
    /*
     * This function updates the screen during the instructions state
     */
    export function instructionsState() {
        background.update(); //update the background
    } //function menuState ends

    /*
     * This function initializes the instructions state
     */
    export function instructions() {
        stage.removeAllChildren(); //clear the stage
        stage.removeAllEventListeners(); //remove event listeners

        //add the background to the stage
        background = new objects.Background();
        stage.addChild(background);

        //add the menu screen
        instructionsScreen = new createjs.Bitmap("/spaceinfiltrators/play/assets/images/instructions_screen.png");
        instructionsScreen.x = 320;
        stage.addChild(instructionsScreen);

        //add the start button
        startButton = new objects.Button("startButton", 640, 423);
        stage.addChild(startButton);

        //add the next button
        nextButton = new objects.Button("nextButton", 879, 423);
        stage.addChild(nextButton);

        //call startButtonClick when the startButton is clicked
        startButton.addEventListener("click", startButtonClick);

        //call nextButtonClick when the nextButton is clicked
        nextButton.addEventListener("click", nextButtonClick);
    } //function instructions ends

    /*
     * This function sets up the second instructions screen when the nextButton is clicked.
     */
    export function nextButtonClick() {
        //remove the instructionsScreen, startButton and nextButton from the stage
        stage.removeChild(instructionsScreen, startButton, nextButton);

        //add the second instructions screen to the stage
        instructionsScreen = new createjs.Bitmap("/spaceinfiltrators/play/assets/images/instructions_screen2.png");
        instructionsScreen.x = 320;
        stage.addChild(instructionsScreen);

        //re-add the start button to the stage
        startButton = new objects.Button("startButton", 640, 423);
        stage.addChild(startButton);

        //set up startButton's click event listener again
        startButton.addEventListener("click", startButtonClick);
    } //function nextButtonClick ends
} //module states ends