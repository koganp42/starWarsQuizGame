# starWarsQuizGame

This quiz consists of a main page, a high scores page, the quiz itself, as well as a page after it's over for submitting your score to the high scores page. Press start to begin!

## How it works

Made from one html file, two js files, and a gently-used css file, the switch between displays is accomplished using javascript to manipulate the display properties of the four divs housing the content. After the start button is clicked, a series of ten questions drawn from the questions js file are displayed. Both correct and incorrect answer submissions will lead to the following question being displayed, though the latter will also take 15 seconds off the total time remaining. The final score is equal to however many seconds remain. After the final question is answered, assuming time hasn't run out, the display switches to a form allowing the user to submit their name and time to the high scores page. Once the user hits submit, they'll be redirected to the high scores page itself where their name and score are displayed.