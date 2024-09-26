/*TODO:
 * Reset board when game ends
 * Create module for displaying the game
 * Create the UI
 */

function Gameboard() {
  const length = 9;
  const board = [];

  for (let i = 0; i < length; i++) {
    board.push(Cell());
  }

  const getBoard = () => board;

  const markCell = (cell, marker) => {
    board[cell].addMarker(marker);
  };

  const printBoard = () => {
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

  const getValue = () => value;

  return { addMarker, getValue };
}

function createPlayer(name, token) {
  return { name, token };
  // Add wins, to keep track of how many wins a player has
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  board.printBoard();

  const players = [
    createPlayer(playerOneName, "x"),
    createPlayer(playerTwoName, "o"),
  ];

  let currentPlayer = players[0];

  const getCurrentPlayer = () => currentPlayer;

  const switchPlayerTrun = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (cell) => {
    if (board.getBoard()[cell].getValue() != 0) {
      console.log("Invalid cell!");
      return;
    }
    console.log("Valid move");
    board.markCell(cell, currentPlayer.token);

    if (checkWin(currentPlayer)) {
      gameOver(false);
    } else if (isDraw()) {
      gameOver(true);
    }

    board.printBoard();

    switchPlayerTrun();
  };

  const checkWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
      return combination.every((index) => {
        return board.getBoard()[index].getValue() === currentPlayer.token;
      });
    });
  };

  const isDraw = () => {
    const isBoardFull = board.getBoard().every((obj) => obj.getValue() !== 0);
    return isBoardFull;
  };

  const gameOver = (draw) => {
    if (draw) {
      console.log("Game is a draw!");
    } else {
      console.log(
        `The winner is: ${currentPlayer.name} (${currentPlayer.token})`
      );
    }
  };

  return { playRound, getBoard: board.getBoard, getCurrentPlayer };
}

function ScreenController() {
  const game = GameController();
}

const game1 = GameController();

const board1 = Gameboard();
