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

function GameController() {}
