/*TODO:
 * When game is over, show who won / if it was a draw
 */
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";

function Gameboard() {
  const length = 9;
  let board = [];

  for (let i = 0; i < length; i++) {
    board.push(Cell());
  }

  const getBoard = () => board;

  const markCell = (cell, marker) => {
    board[cell].addMarker(marker);
  };

  // For console version
  const printBoard = () => {
    console.log(`
      ${board[0].getValue()} ${board[1].getValue()} ${board[2].getValue()}
      ${board[3].getValue()} ${board[4].getValue()} ${board[5].getValue()}
      ${board[6].getValue()} ${board[7].getValue()} ${board[8].getValue()}
      `);
  };

  const resetBoard = () => {
    board = [];

    for (let i = 0; i < length; i++) {
      board.push(Cell());
    }
  };

  return { getBoard, markCell, printBoard, resetBoard };
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
  let score = 0;

  const getPlayerScore = () => score;
  const addScore = () => score++;

  const getName = () => name;
  const changeName = (newName) => {
    name = newName;
  };

  const getToken = () => token;
  return { getName, getToken, getPlayerScore, addScore, changeName };
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
    createPlayer(playerOneName, X_CLASS),
    createPlayer(playerTwoName, CIRCLE_CLASS),
  ];

  let currentPlayer = players[0];

  const getCurrentPlayer = () => currentPlayer;

  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (cell) => {
    if (board.getBoard()[cell].getValue() != 0) {
      return false;
    }
    board.markCell(cell, currentPlayer.getToken());

    if (checkWin(currentPlayer)) {
      return gameOver(false);
    } else if (isDraw()) {
      return gameOver(true);
    }

    // For console
    board.printBoard();

    switchPlayerTurn();
  };

  const checkWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
      return combination.every((index) => {
        return board.getBoard()[index].getValue() === currentPlayer.getToken();
      });
    });
  };

  const isDraw = () => {
    const isBoardFull = board.getBoard().every((obj) => obj.getValue() !== 0);
    return isBoardFull;
  };

  const gameOver = (draw) => {
    if (draw) {
      // TODO: Optimise
      return "draw";
    } else {
      console.log(
        `The winner is: ${currentPlayer.getName()} (${currentPlayer.getToken()})`
      );
      currentPlayer.addScore();

      return "win";
    }
  };

  const restartGame = () => {
    board.resetBoard();
    currentPlayer = players[0];
  };

  return {
    playRound,
    getBoard: board.getBoard,
    getCurrentPlayer,
    restartGame,
    players,
  };
}

const ScreenController = (function () {
  const game = GameController();

  const boardDiv = document.querySelector("#board");
  const playerDiv = document.querySelector(".player-turn");
  const player1Score = document.querySelector(".player1-score");
  const player2Score = document.querySelector(".player2-score");
  const player1Name = document.querySelector(".player1-name");
  const player2Name = document.querySelector(".player2-name");
  const editName1 = document.querySelector(".edit-name1");
  const editName2 = document.querySelector(".edit-name2");
  const restartBtn = document.querySelector(".restart-btn");
  const dialog = document.querySelector(".dialog");

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const currentPlayer = game.getCurrentPlayer();

    playerDiv.textContent = `${currentPlayer.getName()}'s turn...`;

    board.forEach((row, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cells");

      cell.dataset.cell = index;
      if (row.getValue() == X_CLASS || row.getValue() == CIRCLE_CLASS) {
        cell.classList.add(row.getValue());
      }

      boardDiv.appendChild(cell);
    });
  };

  const clickHandlerBoard = (e) => {
    const clickedCell = e.target.dataset.cell;

    if (!clickedCell) return;

    const playerToken = game.getCurrentPlayer().getToken();

    const playeRound = game.playRound(clickedCell);
    if (playeRound == false) {
      return;
    } else if (playeRound == "draw") {
      dialog.showModal();
    } else if (playeRound == "win") {
      game.getCurrentPlayer().getToken() == X_CLASS
        ? (player1Score.textContent =
            "Score: " + game.getCurrentPlayer().getPlayerScore())
        : (player2Score.textContent =
            "Score: " + game.getCurrentPlayer().getPlayerScore());
      dialog.showModal();
    }
    hoverClassUpdate(game.getCurrentPlayer().getToken());
    playedClassUpdate(playerToken, e.target);

    updateScreen();
  };

  const hoverClassUpdate = (playerToken) => {
    boardDiv.classList.remove(X_CLASS);
    boardDiv.classList.remove(CIRCLE_CLASS);
    if (playerToken == X_CLASS) {
      boardDiv.classList.add(X_CLASS);
    } else {
      boardDiv.classList.add(CIRCLE_CLASS);
    }
  };

  const playedClassUpdate = (playerToken, clickedCell) => {
    clickedCell.classList.add(playerToken);
  };

  const initFunction = () => {
    player1Name.textContent = game.players[0].getName();
    player2Name.textContent = game.players[1].getName();

    boardDiv.addEventListener("click", clickHandlerBoard);

    editName1.addEventListener("click", () => {
      const promptName = prompt("Name");
      game.players[0].changeName(promptName);
      playerDiv.textContent = `${game.getCurrentPlayer().getName()}'s turn...`;

      player1Name.textContent = promptName;
    });

    editName2.addEventListener("click", () => {
      const promptName = prompt("Name");
      game.players[1].changeName(promptName);
      playerDiv.textContent = `${game.getCurrentPlayer().getName()}'s turn...`;

      player2Name.textContent = promptName;
    });

    restartBtn.addEventListener("click", () => {
      game.restartGame();
      updateScreen();
      hoverClassUpdate(game.players[0].getToken());
      dialog.close();
    });

    updateScreen();
    hoverClassUpdate(game.players[0].getToken());
  };

  initFunction();
})();
