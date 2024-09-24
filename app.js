function Gameboard() {
  const rows = 3;
  const cols = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) board[i].push(Cell());
  }

  const getBoard = () => board;

  const markCell = (cell, marker) => {};

  const printBoard = () => {};

  function Cell() {}

  return { getBoard, markCell, printBoard };
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
