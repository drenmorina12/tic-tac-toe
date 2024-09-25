function Gameboard() {
  const length = 9;
  const board = [];

  for (let i = 0; i < length; i++) {
    board.push(Cell());
  }

  const getBoard = () => board;

  const markCell = (cell, marker) => {
    if (board[cell].getValue() != 0) return;
    // If cell not marked, dont change player turn
    board[cell].addMarker(marker);
  };

  const printBoard = () => {
    // for(let i = 0; i < length; i++){
    //   if
    // }
    console.log(`
      ${board[0].getValue()} ${board[1].getValue()} ${board[2].getValue()}
      ${board[3].getValue()} ${board[4].getValue()} ${board[5].getValue()}
      ${board[6].getValue()} ${board[7].getValue()} ${board[8].getValue()}
      `);
  };

  return { getBoard, markCell, printBoard };
}

function Cell() {
  let value = 0;

  const addMarker = (player) => {
    value = player;
  };
  // If cell empty, it changes its value

  const getValue = () => value;
  // Get value checks if cell is empty or not

  return { addMarker, getValue };
}

function createPlayer(name, token) {
  return { name, token };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();

  const players = [
    createPlayer(playerOneName, "x"),
    createPlayer(playerTwoName, "circle"),
  ];

  let currentPlayer = players[0];

  const getCurrentPlayer = () => currentPlayer;

  const switchPlayerTrun = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (cell) => {};

  const checkWin = (currentPlayer) => {};

  const isDraw = () => {};

  const gameOver = () => {};

  return { playRound, getBoard: board.getBoard, getCurrentPlayer };
}

GameController();

const board1 = Gameboard();
// board1.markCell(0, 1); // Mark cell 0 with player 1
// console.log(board1.getBoard()[0]);
// console.log(board1.getBoard());
// console.log(board1.getBoard()[0].getValue());
