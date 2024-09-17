
function GameBoard() {
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

    //possible reset board function needed

    return {getBoard, inputMark, printBoard, isFilled};
}

function Player(mark, name) {
    const getMark = () => mark;
    const getName = () => name;
    return {getMark, getName};
}

function GameController() {
    let player1 = Player('X','Player 1');
    let player2 = Player('O', 'Player 2');
    let board = GameBoard();
    let gameOver = false;
    let isTied = false;
    let activePlayer = player1;

    const winCombos = [
                        [0,1,2], [3,4,5], [6,7,8], 
                        [0,3,6], [1,4,7], [2,5,8],
                        [0,4,8], [2,4,6]
                      ];
    
    //returns a player object
    const getActivePlayer = () => {
        return activePlayer;
    }

    const switchPlayer = () => {
        activePlayer = (activePlayer === player1) ? player2 : player1;
    };

    const printNewTurn = () => {
        board.printBoard();
        console.log(`${(getActivePlayer()).getName()}'s Turn`);
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

    printNewTurn();

    return {playTurn, getActivePlayer};
}

const game = GameController();








 
