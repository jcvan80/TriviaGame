var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "z"];
var wins = 0;
var losses = 0;
var guessesLeft = 10;

var winsText = $("#win-text");
var loseText = $("#lose-text");
var guessLeftText = $("#guessesLeft-text");
var userGuessText = $("#userGuesses-text");

var computerGuess = " ";
var incorrectGuesses = [];
var computerChoice = alphabet[Math.floor(Math.random() * alphabet.length)];

document.onkeyup = function (event) {
    var userGuess = event.key;

    if (userGuess === computerChoice) {
        wins++;
    } else {
        guessesLeft--;
        incorrectGuesses.push(userGuess);
    }

    if(guessesLeft <= 0) {
        losses++;
    }

    winsText.textContent = "Wins:" + wins;
    loseText.textContent = "Losses:" + losses;
    userGuessText.textContent = 'Guesses Left' +  guessesLeft;
    userGuessText.textContent = "Your guesses" + incorrectGuesses;

    

}
