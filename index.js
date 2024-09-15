
function GameBoard() {
    let gameBoard = ['','','','','','','','',''];

    const getBoard = () => gameBoard;

    //Allow user to input positions 1-9. Will adjust it for index.
    const inputMark = (mark, position) => {
        if (gameBoard[position-1] === '') {
            gameBoard[position-1] = mark;
        } else {
            return;
        }
    };  
    
    const printBoard = () => {
        const board2d = [[gameBoard[0],gameBoard[1],gameBoard[2]],
                         [gameBoard[3],gameBoard[4],gameBoard[5]],
                         [gameBoard[6],gameBoard[7],gameBoard[8]]
                        ];
        console.log(board2d);
    };

    return {getBoard, inputMark, printBoard};
}

let board = GameBoard();
board.printBoard();
board.inputMark('X', 3);
board.printBoard();


/** 
function Player(mark, name) {
    const getMark = () => mark;
    const getName = () => name;
    return {getMark, getName};
}*/

