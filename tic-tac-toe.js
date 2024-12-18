/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    board[position] = mark
}

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() {
    function displayCell(position) {
        return board[position] === ' ' ? position : board[position];
    }

    console.log(
        displayCell(1), '|', displayCell(2), '|', displayCell(3),
        '\n---------\n',
        displayCell(4), '|', displayCell(5), '|', displayCell(6),
        '\n---------\n',
        displayCell(7), '|', displayCell(8), '|', displayCell(9)
    );
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function validateMove(position) {
    if (Number(position) <= 9 && Number(position) >= 1 && board[position] === ' '){
        return true;
    } else {
        return false;
    }
}

// TODO: list out all the combinations of winning, you will need this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    for (i = 0; i< winCombinations.length; ++i){
        if (board[winCombinations[i][0]] === player && board[winCombinations[i][1]] === player &&
            board[winCombinations[i][2]] === player){
                return true;
                break;
            }
    }
    return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    for (i=1 ; i < 10; ++i){
        if (board[i] === ' '){
            return false;
            break;
        }
    }
    return true;
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    // user inputting position
    let inputPosition = false;

    //checking position input is correct
    while (!inputPosition){
        var position = prompt(`${player}'s turn, input: `);
        if (validateMove(position) === false){
            console.log('Please input a number that is available on the board.');
        } else {
            inputPosition = true;
        }
    };

    // updating board based on user input
    markBoard(position, player);

    // printing updated board
    printBoard();

    // checking win/tie and switching players
    if (checkWin(player) === true){
        console.log(`Congratulations player ${player} won!`)
        winnerIdentified = true;
    } else if (checkFull(player) === true){
        console.log("It's a tie!")
        winnerIdentified = true;
    } else {
        currentTurnPlayer = currentTurnPlayer === 'X'? 'O':'X';
    };

}

// checking if user wants to play again
let playAgain = true;
while(playAgain){
    var board = {
        1: ' ', 2: ' ', 3: ' ',
        4: ' ', 5: ' ', 6: ' ',
        7: ' ', 8: ' ', 9: ' '
    };

    // entry point of the whole program
    console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

    var winnerIdentified = false;
    var currentTurnPlayer = 'X';

    while (!winnerIdentified){
    playTurn(currentTurnPlayer);
    }

    // ask user to play again
    let asktoReplay = false;

    while (!asktoReplay){
        let replayAnswer = prompt('Would you like to play again? [Y] or [N]: ');

        if (replayAnswer.toUpperCase() === 'Y'){
            winnerIdentified = false;
            asktoReplay = true;
        } else if (replayAnswer.toUpperCase() === 'N'){
            asktoReplay = true;
            playAgain= false;
        } else {
            console.log('Please answer Y or N.')
        }
    }
    

}

