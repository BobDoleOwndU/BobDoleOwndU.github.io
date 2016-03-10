var states;
(function (states) {
    /*
     * This function updates the game during the game over state
     */
    function gameOverState() {
        background.update(); //update the background
    }
    states.gameOverState = gameOverState; //function gameOverState ends
    /*
     * This function intializes the game over state
     */
    function gameOver() {
        stage.removeAllChildren(); //clear the stage
        stage.removeAllEventListeners(); //remove event listeners
        createjs.Sound.stop(); //stop the sound
        //add the background to the stage
        background = new objects.Background();
        stage.addChild(background);
        //display the status of the mission outcome on the stage
        missionOutcomeText = new createjs.Text(missionOutcome, "72px Arial", "Red");
        missionOutcomeText.x = 640 - (missionOutcomeText.getMeasuredWidth() / 2);
        stage.addChild(missionOutcomeText);
        //display the final score on the stage
        scoreText = new createjs.Text("Final Score: " + score, "72px Arial", "Red");
        scoreText.x = 640 - (scoreText.getMeasuredWidth() / 2);
        scoreText.y = 100;
        stage.addChild(scoreText);
        //add the againButton to the stage
        againButton = new objects.Button("againButton", 640, 423);
        stage.addChild(againButton);
        //call the startButtonClick function on the againButton's click
        againButton.addEventListener("click", states.startButtonClick);
    }
    states.gameOver = gameOver; //function gameOver ends
})(states || (states = {})); //module states ends
//# sourceMappingURL=game_over.js.map