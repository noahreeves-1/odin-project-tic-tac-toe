// MODULE GAMEBOARD //

const gameboard = {
    gameArray: ['', '', '', '', '', '', '', '', '']
};


// FACTORY FUNCTION PLAYER //
const createPlayer = (name, marker) => {

    playerName = name;
    playerMarker = marker;
    const wins = 0;

    return {
        name,
        marker,
        wins
    }
};

// MODULE DISPLAY CONTROLLER //
const displayController = ((_playerOne, _playerTwo) => {

    let numberOfGrids = 3;

    _playerOne = createPlayer('fdsa', 'X');
    _playerTwo = createPlayer('Computer', 'O');

    let turn = 0;

    const _gameArray = gameboard.gameArray;
    const display = document.querySelector('.display');
    const winCounter = document.querySelector('.winCounter');

    // Private Functions
    const _gameLogic = () => {
        if (turn > 0) {
            let marker = "";
            let winner = '';

            const _ultimateWinner = () => {
                if (_playerOne.wins === numberOfGrids) {
                    let _ultimateWinner = _playerOne.name;
                    let _ultimateWinnerWins = _playerOne.wins;
                    display.textContent = `${_ultimateWinner} won best out of five!`;
                    winCounter.textContent = `Wins: ${_ultimateWinnerWins}`;
                    winner = '';
                    _playerOne.wins = 0;
                    _playerTwo.wins = 0;
                    turn = 0;
                } else if (_playerTwo.wins === numberOfGrids) {
                    let _ultimateWinner = _playerTwo.name;
                    let _ultimateWinnerWins = _playerTwo.wins;
                    display.textContent = `${_ultimateWinner} won best out of five!`;
                    winCounter.textContent = `Wins: ${_ultimateWinnerWins}`;
                    winner = '';
                    _playerOne.wins = 0;
                    _playerTwo.wins = 0;
                    turn = 0;
                }
            };

            const _resetGame = () => {
                
                console.log('resetGame() ran!')

                const boardPieces = document.querySelectorAll('.boardPiece');
                boardPieces.forEach((piece) => {
                    piece.textContent = '';
                })
                for (let i = 0; i < _gameArray.length; i++) {
                    _gameArray[i] = ''
                };
                winner = '';
                turn = 0;
                display.textContent = "";
                winCounter.textContent = `Wins: ${_playerOne.wins}`

                console.log(_gameArray)
            };

            const _assignWinner = () => {

                console.log('assignWinner() ran'); // just making sure it's running

                if (marker === _playerOne.marker) {
                    winner = _playerOne;
                    winner.wins++;
                    display.textContent = `${winner.name} won!`;
                    winCounter.textContent = `Wins: ${winner.wins}`;
                    _ultimateWinner();
                    setTimeout(_resetGame, 2500);
                } else if (marker === _playerTwo.marker) {
                    winner = _playerTwo;
                    winner.wins++;
                    display.textContent = `${winner.name} won!`;
                    winCounter.textContent = `Wins: ${_playerOne.wins}`;
                    _ultimateWinner();
                    setTimeout(_resetGame, 2500);
                } else {
                    return
                }
            };

            // check rows IIFE
            const _checkRows= (() => {
                for (i = 0; i < numberOfGrids; i++) {
                    let _rows = [];
                    for (let j = i * numberOfGrids; j < i * numberOfGrids + numberOfGrids; j++) {
                        _rows.push(_gameArray[j]);
                    } // inner loop
                        
                    if (_rows.every(field => field === 'X') || _rows.every(field => field === "O")) {
                        marker = _rows[0];
                        _assignWinner();
                    }
                } // first for loop
            })();

            // check columns IIFE
            const _checkColumns = (() => {
                for (i = 0; i < numberOfGrids; i++) {
                    let _columns = [];

                    for (j = 0; j < numberOfGrids; j++) {
                        _columns.push(_gameArray[(j * numberOfGrids + i)])
                    }

                    if (_columns.every(field => field === "X") || _columns.every(field => field === "O")) {
                        marker = _columns[0];
                        _assignWinner();
                    }
                }
            })();

            // check diagonals IIFE
            const _checkDiagonals = (() => {
                let _diagonal1 = [];
                for (i = 0; i < numberOfGrids; i++) {
                    _diagonal1.push(_gameArray[(i * (numberOfGrids + 1))]);
                }
                if (_diagonal1.every(field => field === "X") || _diagonal1.every(field => field === "O")) {
                    marker = _diagonal1[0];
                    _assignWinner();
                }

                let _diagonal2 = [];
                for (i = 1; i < numberOfGrids + 1; i++) {
                    _diagonal2.push(_gameArray[i * 2]);
                }
                if (_diagonal2.every((field) => field === "X") || _diagonal2.every((field) => field === "O")) {
                    marker = _diagonal2[0];
                    _assignWinner();
                }

            })();

            // check for TIE
            if (turn === 9 && !winner) {
                alert('Tied!');
                _resetGame();
            };            
        };
    };

    // Show Tic Tac Toe Board
    const createGameboard = () => {

        for (i = 0; i < gameboard.gameArray.length; i++) {

            const _obj = document.querySelector('#gameboard');
            const _newDiv = document.createElement('div'); // create DIV for each board piece (9) with CLASS as boardPiece

            _newDiv.classList.add('boardPiece', i + 1);
            _newDiv.dataset.grid = i + 1;
            _newDiv.append(gameboard.gameArray[i]);
            _obj.appendChild(_newDiv);
            _newDiv.addEventListener('click', () => { // add marker if you click on it
                let _index = _newDiv.dataset.grid - 1;

                if (_gameArray[_index] === '') {
                    if (turn === 0 || turn % 2 === 0) {
                        let _marker = _playerOne.marker;

                        _gameArray[_index] = _marker;
                        _newDiv.textContent = _gameArray[_index];
                        turn++;

                        setTimeout(_gameLogic, 50);

                        console.log("Turn " + turn, gameboard.gameArray)
                    } else {
                        let _index = _newDiv.dataset.grid - 1;
                        let _marker = _playerTwo.marker;

                        _gameArray[_index] = _marker;
                        _newDiv.textContent = _gameArray[_index];
                        turn++;

                        _gameLogic();

                        console.log("Turn " + turn, _gameArray)
                    }
                } else {
                    alert('This spot is taken!');
                }
            }); // END OF EVENT LISTENER

        }; // END OF FOR LOOP

    };
    
    // X or O picker
    const pickMarker = () => {

        const _choiceO = document.querySelector('.choiceO');
        const _choiceX = document.querySelector('.choiceX');

        _choiceO.addEventListener('click', () => {
            if (turn === 0) {
                console.log('O was clicked');
                _playerOne.marker = _choiceO.textContent;
                _playerTwo.marker = _choiceX.textContent;
                _choiceO.style.backgroundColor = "rgb(215, 240, 248)";
                _choiceX.style.backgroundColor = '#DEDEDE';

                console.log(_playerOne);
            } else {
                alert("The game's not over yet!");
            }
        });

        _choiceX.addEventListener('click', () => {
            if (turn === 0) {
                console.log('X was clicked');
                _playerOne.marker = _choiceX.textContent;
                _playerTwo.marker = _choiceO.textContent;
                _choiceX.style.backgroundColor = "rgb(215, 240, 248)";
                _choiceO.style.backgroundColor = "#DEDEDE";

                console.log(_playerOne);
            } else {
                alert("The game's not over yet!");
            }
        });

    };

    const setName = () => {
        const submitBtn = document.querySelector('#submit-name');
        submitBtn.addEventListener('click', () => {
            const submittedName = document.querySelector('#name-input').value;
            _playerOne.name = submittedName
            console.log('This is being logged ' + _playerOne.name);
        })
    }

    const quitGame = () => {
        const quitBtn = document.querySelector('.quit-button');

        quitBtn.addEventListener('click', () => {
            console.log('quitBtn was clicked');

            _playerTwo.wins++;
            console.log(_playerTwo.wins)

            const boardPieces = document.querySelectorAll('.boardPiece');
            boardPieces.forEach((piece) => {
                piece.textContent = '';
            });

            for (let i = 0; i < _gameArray.length; i++) {
                _gameArray[i] = ''
            };

            winner = '';
            turn = 0;
            display.textContent = "You quit! Computer wins.";
            winCounter.textContent = `Wins: ${_playerOne.wins}`;

            console.log(_gameArray);

            if (_playerTwo.wins === 3) {
                let _ultimateWinner = _playerTwo.name;
                // let _ultimateWinnerWins = _playerTwo.wins;
                display.textContent = `${_ultimateWinner} won best out of five!`;
                winCounter.textContent = `Wins: ${_playerOne.wins}`;
                winner = '';
                _playerOne.wins = 0;
                _playerTwo.wins = 0;
                turn = 0;
            }
        })
    }

    // Expose these items
    return {
        createGameboard,
        pickMarker,
        setName,
        quitGame
    };

})();

displayController.createGameboard();
displayController.pickMarker();
displayController.setName();
displayController.quitGame();