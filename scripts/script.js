/*
Tu principal objetivo aquí es tener el menor código global posible. Trata de esconder todo dentro de un módulo o fábrica. Regla general: si sólo necesitas UNA cosa (gameBoard, displayController), utiliza un módulo. Si necesitas múltiplos de algo (¡jugadores!), créalos con fábricas.
*/

//NÚMEROS DE JUGADORES --> 1 y 2

//IDENTIFICACIÓN DE FICHAS --> "" (ninguna), X (player1), O (player2)


let playerActive = 1;


//---------------------------------PLAYER---------------------------------

function Player(name, number) {   // Factory Function
    
  let score = 0;

  function getName() {
    return name;
  }

  function addPoint() {
    score++;
  }

  function getPoints() {
    return score;
  }

  function resetPoints() {
    score = 0;
  }

  return {
    getName,
    addPoint,
    getPoints,
    resetPoints,
  };
}


//---------------------------------GAMEBOARD---------------------------------

const Tabla = function(player1, player2) {   // Module Pattern
    
  const gameBoard = [
    ["", "", ""], 
    ["", "", ""], 
    ["", "", ""]
  ];

  const bodyUI = document.querySelector("body");
  
  const gameBoardUI = document.querySelector(".gameboard");
    
  function printArray() {
    for (let i = 0; i < 3; i++) {
      console.log(gameBoard[i]);
    }
  }
  
  /*function createGameBoardUI() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cellUI = document.createElement("button");
        cellUI.classList.add("cell");
        cellUI.setAttribute("data-row", i.toString());
        cellUI.setAttribute("data-column", j.toString());
        cellUI.value = gameBoard[i][j];
        cellUI.textContent = cellUI.value;
        cellUI.addEventListener("click", () => {
          if (isThereAPiece(i, j)) {
            return;
          }
          else {
            insertPiece(playerActive, i, j);
        }});
        gameBoardUI.appendChild(cellUI);
      }
    }
    containerUI.appendChild(gameBoardUI);
  }*/

  function isThereAPiece(row, column) {
    return (gameBoard[row][column] !== "") ? true : false;
  }

  function insertPiece(numberOfPlayer, row, column) {
    gameBoard[row][column] = (numberOfPlayer === 1) ? "X" : "O";
    console.log(gameBoard);
  }

  function checkRow(row) {   //una fila es un array unidimensional
    let result = false;
    if (gameBoard[row].every(element => element === "X")) {
      result = true;
    }
    else if (gameBoard[row].every(element => element === "O")) {
      result = true;
    }
    return result;
  }

  function checkColumn(column) {   //una columna es la misma posición de 3 arrays distintos
    let result = false;
    let auxArray = [];
    for (let i = 0; i < 3; i++) {
      auxArray.push(gameBoard[i][column]);
    }
    if (auxArray.every(element => element === "X")) {
      result = true;
    }
    else if (auxArray.every(element => element === "O")) {
      result = true;
    }
    return result;
  }

  function checkXLeftStart() {
    let result = false;
    let auxArray = [];
    for (let i = 0; i < 3; i++) {
      auxArray.push(gameBoard[i][i]);
    }
    if (auxArray.every(element => element === "X")) {
      result = true;
    }
    else if (auxArray.every(element => element === "O")) {
      result = true;
    }
    return result;
  }

  function checkXRightStart() {
    let result = false;
    let auxArray = [];
    for (let i = 0, j = 2; i < 3; i++, j--) {
      auxArray.push(gameBoard[i][j]);
    }
    if (auxArray.every(element => element ==="X")) {
      result = true;
    }
    else if (auxArray.every(element => element === "O")) {
      result = true;
    }
    return result;
  }

  function isThereAWinner() {   //retorna objeto con resultado y jugador
    let result = false;
    let player = -1;
    for (let i = 0; i < 3; i++) {
      if (checkRow(i)) {
        result = true;
        player = (gameBoard[i][0] === "X") ? 1 : 2;
        break;
      }
      if (checkColumn(i)) {
        result = true;
        player = (gameBoard[0][i] === "X")  ? 1 : 2;
        break;
      }
      if (checkXLeftStart()) {
        result = true;
        player = (gameBoard[0][0] === "X") ? 1 : 2;
        break;
      }
      if (checkXRightStart()) {
        result = true;
        player = (gameBoard[2][2] === "X")  ? 1 : 2;
        break;
      }
    }
    return {
      result,
      player
    };
  }

  function resetArray() {
    for (let i = 0; i < 3; i++) {
      gameBoard[i].fill("");
    }
    console.log(gameBoard);
  }

  function handlePressCell(e) {
    let row = e.target.dataset.row;
    let column = e.target.dataset.column;

    if (isThereAPiece(row, column) === false) {
      insertPiece(playerActive, row, column);
      if (isThereAWinner.result === true) {
        console.log(`Ganó el jugador número ${playerActive}`);
      }
    }
  }

  function handleResetGame() {
    playerActive = 1;
    resetArray();
  }

  return {
    printArray,
    //printGameBoardUI,
    isThereAPiece,
    insertPiece,
    resetArray,
    isThereAWinner,
    handlePressCell,
    handleResetGame,
    //whoWin,
  };

};


//--------------------------MAIN-----------------------------


function main() {
  
  const player1 = Player("Eric", 1);
  const player2 = Player("Pep", 2);
  const tabla = Tabla(player1, player2);

  const gameBoardUI = document.querySelector(".tabla");
  const resetGameUI = document.querySelector(".reset-game");
  const player1PointsUI = document.querySelector(".player1-points");
  const player2PointsUI = document.querySelector(".player2-points");

  for (let i = 0; i < 9; i++) {
    gameBoardUI.children[i].addEventListener("click", tabla.handlePressCell);
  }

  resetGameUI.addEventListener("click", tabla.handleResetGame);

};

main();






