var states;
(function (states) {
    /*
     * This function updates the screen during the instructions state
     */
    function instructionsState() {
        background.update(); //update the background
    }
    states.instructionsState = instructionsState; //function menuState ends
    /*
     * This function initializes the instructions state
     */
    function instructions() {
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
        startButton.addEventListener("click", states.startButtonClick);
        //call nextButtonClick when the nextButton is clicked
        nextButton.addEventListener("click", nextButtonClick);
    }
    states.instructions = instructions; //function instructions ends
    /*
     * This function sets up the second instructions screen when the nextButton is clicked.
     */
    function nextButtonClick() {
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
        startButton.addEventListener("click", states.startButtonClick);
    }
    states.nextButtonClick = nextButtonClick; //function nextButtonClick ends
})(states || (states = {})); //module states ends
//# sourceMappingURL=instructions.js.map