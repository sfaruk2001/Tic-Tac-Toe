
board = (function GameBoard() {
    let gameBoard = ['','','','','','','','',''];

    const getBoard = () => {
        return gameBoard;
    };

    //Allow user to input positions 1-9. Will adjust it for index.
    const inputMark = (mark, position) => {
        if (gameBoard[position-1] === '') {
            gameBoard[position-1] = mark;
        } else {
            return;
        }
    };
    
    const isFilled = (position) => {
        if (gameBoard[position-1].length === 0) {
            return false;
        } else {
            return true;
        }
    }
    
    const printBoard = () => {
        const board2d = [[gameBoard[0],gameBoard[1],gameBoard[2]],
                         [gameBoard[3],gameBoard[4],gameBoard[5]],
                         [gameBoard[6],gameBoard[7],gameBoard[8]]
                        ];
        console.log(board2d);
    };

    const resetBoard = () => {
        gameBoard = ['','','','','','','','',''];
    }

    //possible reset board function needed

    return {getBoard, inputMark, printBoard, isFilled, resetBoard};
})();

function Player(mark, name, player_num) {
    const getMark = () => mark;
    const getName = () => name;
    const setName = (newName) => {
        if(newName === '') {
            if (player_num === 1) {
                name = 'Player 1';
            } else {
                name = 'Player 2';
            }
        } else {
            name = newName;
        }
    }
    return {getMark, getName, setName};
}

const game = (function GameController() {
    let player1 = Player('X','Player 1', 1);
    let player2 = Player('O', 'Player 2', 2);
    //let board = GameBoard();
    let gameOver = false;
    let isTied = false;
    let activePlayer = player1;

    const winCombos = [
                        [0,1,2], [3,4,5], [6,7,8], 
                        [0,3,6], [1,4,7], [2,5,8],
                        [0,4,8], [2,4,6]
                      ];

    //returns game status
    const isGameOver = () => {
        return gameOver;
    }

    const isGameTied = () => {
        return isTied;
    }
    
    //returns a player object
    const getActivePlayer = () => {
        return activePlayer;
    }

    const getPlayer1 = () => {
        return player1;
    }

    const getPlayer2 = () => {
        return player2
    }

    const switchPlayer = () => {
        activePlayer = (activePlayer === player1) ? player2 : player1;
    };

    const printNewTurn = () => {
        board.printBoard();
        console.log(`${(getActivePlayer()).getName()}'s Turn`);
    }

    const resetGame = () => {
        board.resetBoard();
        gameOver = false;
        isTied = false;
        activePlayer = player1;
        printNewTurn();
    }

    const playTurn = (position) => {
        if (gameOver === true) {
            return;
        }

        //checks if the player's position is already filled
        if (board.isFilled(position)) {
            console.log("This position is already taken up please choose another spot!");
            return;
        }

        board.inputMark((getActivePlayer()).getMark(), position);
        /**
         * Check for win conditions or ties
         * if it matches either set gameover to true 
         */
        checkForWin(board.getBoard(), (getActivePlayer()));
        if (gameOver === true) {
            board.printBoard();
            console.log(`${(getActivePlayer()).getName()} won`);
            return;
        }
        checkForTie(board.getBoard());
        if (gameOver === true && isTied === true) {
            board.printBoard();
            console.log("It's a Tie!");
            return;
        }

        
        switchPlayer();
        printNewTurn();
    }

    const checkForWin = (board, player) => {
        for (let i = 0; i < winCombos.length; i++) {
            if (board[(winCombos[i][0])] === player.getMark() && board[(winCombos[i][1])] === player.getMark() && board[(winCombos[i][2])] === player.getMark()) {
                gameOver = true;
                return;
            }
        }
    }

    const checkForTie = (board) => {
        for (let i = 0; i < board.length; i++) {
            if (board[i].length === 0) {
                return;
            }
        }
        gameOver = true;
        isTied = true;
    }

    //printNewTurn();

    return {playTurn, getActivePlayer, isGameOver, isGameTied, getPlayer1, getPlayer2, getBoard: board.getBoard, resetGame};
})();

(function displayController() {
    const boardDiv = document.querySelector('.board');
    const cellArr = document.querySelectorAll('.cell');
    let startButton = document.querySelector('.start');
    let form = document.querySelector('.inputPlayer');
    let resetButton = document.querySelector('.reset');
    let winStatus = document.querySelector('.win-status');

    startButton.addEventListener('click', () => {
        form.style.display = 'none';
        boardDiv.style.display = 'grid';
        resetButton.style.display = 'block';
        winStatus.style.display = 'block';

        game.getPlayer1().setName(document.getElementById('player-1').value);
        game.getPlayer2().setName(document.getElementById('player-2').value);
        winStatus.textContent = `It's ${game.getPlayer1().getName()}'s Turn!`;
    });

    resetButton.addEventListener('click', () => {
        game.resetGame();
        render();
        winStatus.textContent = `It's ${game.getPlayer1().getName()}'s Turn!`;
    });
    
    const render = () => {
        for (let i = 0; i < cellArr.length; i++) {
            cellArr[i].textContent = game.getBoard()[i];
        }
    }

    const handleClick = (e) => {
        
        if ((e.target.textContent).length === 1) {
            return;
        }  else {
            game.playTurn(e.target.dataset.cell);
            render();
            if (game.isGameOver()) {
                //winStatus.style.display = 'block';
                if (game.isGameTied()) {
                    winStatus.textContent = "It's a Tie!";
                } else {
                    winStatus.textContent = `${game.getActivePlayer().getName()} is the Winner!`;
                }
            } else {
                winStatus.textContent = `It's ${game.getActivePlayer().getName()}'s Turn!`;
            }
        }
    }

    cellArr.forEach((cell) => {
        cell.addEventListener('click', handleClick);
    });


})();







 
