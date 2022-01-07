// MODULE GAMEBOARD

const gameboard = {
    gameArray: ['', '', '', '', '', '', '', '', '']
};


// FACTORY FUNCTION PLAYER
const createPlayer = (name, marker) => {

    playerName = name;
    playerMarker = marker

    return {
        name,
        marker,
    }
};

// MODULE DISPLAY CONTROLLER
const displayController = ((playerOne, playerTwo) => {

    playerOne = createPlayer('Player 1', 'X');
    playerTwo = createPlayer('Player 2', 'O');

    turn = 0;

    const pickMarker = () => {
        if (turn === 0) {

            const choiceO = document.querySelector('.choiceO');
            const choiceX = document.querySelector('.choiceX');

            choiceO.addEventListener('click', () => {
                console.log('this was clicked');
                playerOne.marker = choiceO.textContent;
                playerTwo.marker = choiceX.textContent;
            });
            choiceX.addEventListener('click', () => {
                playerOne.marker = choiceX.textContent;
                playerTwo.marker = choiceO.textContent;
            });

        } else {
            alert("The game's not over yet!");
        }

        console.log(playerOne);

    };
    

    // Show Tic Tac Toe Board
    const createGameboard = () => {
        const _obj = document.querySelector('#gameboard');
        pickMarker();

        for (i = 0; i < gameboard.gameArray.length; i++) {

            // create DIV for each board piece (9) with CLASS as boardPiece
            const newDiv = document.createElement('div');

            newDiv.classList.add('boardPiece', i + 1);
            newDiv.dataset.grid = i + 1;

            // add marker if you click on it
            newDiv.addEventListener('click', () => {
                const theGameBoard = gameboard.gameArray;
                let index = newDiv.dataset.grid - 1;

                if (theGameBoard[index] === '') {
                    if (turn === 0 || turn % 2 === 0) {
                        let marker = playerOne.marker;
                        theGameBoard[index] = marker;
                        newDiv.textContent = theGameBoard[index];
                        turn++;
                        console.log("Turn " + turn, gameboard.gameArray)
                    } else {
                        let index = newDiv.dataset.grid - 1;
                        let marker = playerTwo.marker;
                        const theGameBoard = gameboard.gameArray;
                        theGameBoard[index] = marker;
                        newDiv.textContent = theGameBoard[index];
                        turn++;
                        console.log("Turn " + turn, gameboard.gameArray)
                    }
                } else {
                    alert('This spot is taken!');
                }
            })
            newDiv.append(gameboard.gameArray[i]);
            _obj.appendChild(newDiv);
        }
    };

    // Ancillary Functions

    // Expose these items
    return {
        createGameboard
    };

})();

displayController.createGameboard();
// displayController.pickMarker();

// const playerOne = createPlayer('Player 1', 'X');
// // playerOne.setMarker();
// console.log(playerOne);

// const playerTwo = createPlayer('Player 2', 'O');
// console.log(playerTwo);


// PSEDUO CODE //

// create two players - one for the user (me) and one for the computer
//      each player should have a value for their symbol (either 'X' or 'O')

// create the gameboard. it should consist of 9 square grids
// clicking each grid should turn the board 'X' or 'O' depending on your symbol

// the user always goes first
// after a player places a Marker, their turn is over
// on their turn the computer will pick a random box (DUMB AI)
// if the user or computer hits 3 grids in a row, column, or diagonally, they win