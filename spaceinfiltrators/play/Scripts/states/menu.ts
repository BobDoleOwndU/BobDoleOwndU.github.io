module states {
    /*
     * This function updates the screen during the menu state
     */
    export function menuState() {
        background.update();
    } //function menuState ends

    /*
     * This function initializes the menu state
     */
    export function menu() {
        stage.removeAllChildren(); //clear the stage
        stage.removeAllEventListeners(); //remove event listeners

        //add the background to the stage
        background = new objects.Background();
        stage.addChild(background);

        //add the menu screen
        menuScreen = new createjs.Bitmap("assets/images/menu_screen.png");
        menuScreen.x = 320;
        stage.addChild(menuScreen);

        //add the start button
        startButton = new objects.Button("startButton", 402, 423);
        stage.addChild(startButton);

        //add the instructions button
        instructionsButton = new objects.Button("instructionsButton", 878, 423);
        stage.addChild(instructionsButton);

        //set startButton to call startButtonClick on click
        startButton.addEventListener("click", startButtonClick);

        //set instructionsButton to call instuctionsButtonClick on click
        instructionsButton.addEventListener("click", instructionsButtonClick);
    } //function menu ends

    /*
     * This function changes the state to play when the startButton is clicked.
     */
    export function startButtonClick() {
        currentState = constants.PLAY_STATE;
        changeState(currentState);
    } //function playButtonClick ends

    /*
     * This function changes the state to instructions when the insturctionsButton is clicked.
     */
    export function instructionsButtonClick() {
        currentState = constants.INSTRUCTIONS_STATE;
        changeState(currentState);
    } //function playButtonClick ends
} //module states ends