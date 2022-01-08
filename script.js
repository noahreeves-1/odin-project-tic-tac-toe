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

    _playerOne = createPlayer('Player 1', 'X');
    _playerTwo = createPlayer('Computer', 'O');

    let turn = 0;

    const _gameArray = gameboard.gameArray;

    // Private Functions
    const _gameLogic = () => {
        if (turn > 0) {
            let marker = "";
            let winner = '';

            const _ultimateWinner = () => {
                if (_playerOne.wins === 3) {
                    let _ultimateWinner = _playerOne.name;
                    alert(`${_ultimateWinner} wins best out of five!`)
                } else if (_playerTwo.wins === 3) {
                    let _ultimateWinner = _playerTwo.name;
                    alert(`${_ultimateWinner} wins best out of five!`)
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

                console.log(_gameArray)
            };

            const _assignWinner = () => {
                console.log('assignWinner() ran');
                if (marker === _playerOne.marker) {
                    winner = _playerOne;
                    winner.wins++;
                    alert(`${winner.name} wins!`);
                    console.log(winner)
                    _ultimateWinner();
                    setTimeout(_resetGame, 2500);
                } else if (marker === _playerTwo.marker) {
                    winner = _playerTwo;
                    winner.wins++;
                    alert(`${winner.name} wins!`);
                    console.log(winner);
                    _ultimateWinner();
                    setTimeout(_resetGame, 2500);
                } else {
                    return
                }
            };

            // check rows
            if (_gameArray[0] != '' &&
                _gameArray[0] === _gameArray[1] &&
                _gameArray[1] === _gameArray[2]) {
                marker = _gameArray[0];
                _assignWinner();
            } else if (_gameArray[3] != '' &&
                _gameArray[3] === _gameArray[4] &&
                _gameArray[4] === _gameArray[5]) {
                marker = _gameArray[3];
                _assignWinner();
            } else if (_gameArray[6] != '' &&
                _gameArray[6] === _gameArray[7] &&
                _gameArray[7] === _gameArray[8]) {
                marker = _gameArray[6];
                _assignWinner();

                // check columns
            } else if (_gameArray[0] != '' &&
                _gameArray[0] === _gameArray[3] &&
                _gameArray[3] === _gameArray[6]) {
                marker = _gameArray[0];
                _assignWinner();
            } else if (_gameArray[1] != '' &&
                _gameArray[1] === _gameArray[4] &&
                _gameArray[4] === _gameArray[7]) {
                marker = _gameArray[1];
                _assignWinner();
            } else if (_gameArray[2] != '' &&
                _gameArray[2] === _gameArray[5] &&
                _gameArray[5] === _gameArray[8]) {
                marker = _gameArray[2];
                _assignWinner();

                // check diagonals
            } else if (_gameArray[0] != '' &&
                _gameArray[0] === _gameArray[4] &&
                _gameArray[4] === _gameArray[8]) {
                marker = _gameArray[0];
                _assignWinner();
            } else if (_gameArray[2] != '' && _gameArray[2] === _gameArray[4] && _gameArray[4] === _gameArray[6]) {
                marker = _gameArray[2];
                _assignWinner();
            } else {
                console.log(`no winner yet`)
            };

            // check for TIE
            if (turn === 9 && !winner) {
                alert('Tied!');
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

                        setTimeout(_gameLogic, 100);

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

    // Expose these items
    return {
        createGameboard,
        pickMarker
    };

})();

displayController.createGameboard();
displayController.pickMarker();