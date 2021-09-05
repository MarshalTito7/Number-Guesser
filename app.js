


//Given Values
let min = 1,
    max = 10,
    winningNum = getWinningNum(min,max),
    guessesLeft = 3;

// UI elements
const gameWrapper = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn');
    guessInput = document.querySelector('#guess-input');
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event listener
gameWrapper.addEventListener('mousedown',function(e){    // Here we must use the mousedown event and not the click event because in the click event as soon as the click is released this function gets called and we can't see the results....using the mousedown event will call the function only when the click button is pressed and thus not reload the page immediately 
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Listen For guess
guessBtn.addEventListener('click',function(){
    let guess = parseInt(guessInput.value);  //Initially it is returned as a string because the color of the text in the console is black

    // console.log(guess);
    if ( isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`,'red');
    }

    // check if won
    if (guess === winningNum) {
        // // disable input
        // guessInput.disabled = true;
        // // Change border color
        // guessInput.style.borderColor = 'green';
        // // Set message
        // setMessage(`${winningNum} is correct, YOU WIN!`,'green')

        gameOver(true,`${winningNum} is correct, YOU WIN!`)
    } else{
        // Wrong Number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // Game over - lost
            // // disable input
            // guessInput.disabled = true;
            // // Change border color
            // guessInput.style.borderColor = 'red';
            // // Set message
            // setMessage(`Game Over, you lost. The correct number was ${winningNum}`,'red')
            gameOver(false,`Game Over, you lost. The correct number was ${winningNum}`)
        } else{
            // Game continues - answer wrong

             // Change border color
             guessInput.style.borderColor = 'red';

            // Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`,'red');

            // Clear input 
            guessInput.value = '';
        }
    }
});

// Game over
function gameOver(won,msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set message
    setMessage(msg,color)

    // Play Again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again'; //This would append the class name
    
}

// Get Winning Number
function getWinningNum(min,max) {
   return Math.floor(Math.random()*(max-min+1)+min);
}

function setMessage(msg,color){
    message.textContent = msg;
    message.style.color = color;
}