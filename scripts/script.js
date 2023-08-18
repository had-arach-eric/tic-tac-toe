/*
Tu principal objetivo aquí es tener el menor código global posible. Trata de esconder todo dentro de un módulo o fábrica. Regla general: si sólo necesitas UNA cosa (gameBoard, displayController), utiliza un módulo. Si necesitas múltiplos de algo (¡jugadores!), créalos con fábricas.
*/

//NÚMEROS DE JUGADORES --> 1 y 2

//IDENTIFICACIÓN DE FICHAS --> "" (ninguna), X (player1), O (player2)



//---------------------------------PLAYER---------------------------------

function Player(number) {   // Factory Function
    
  let name = prompt("Introduce tu nombre");
  let score = 0;
  let active = false;

  function getName() {
    return name;
  }

  function setPoints() {
    score++;
  }

  function getPoints() {
    return score;
  }

  function setActive() {
    active = !active;
  }

  function getActive() {
    return active;
  }

  return {
    getName,
    setPoints,
    getPoints,
  };
}


//---------------------------------GAMEBOARD---------------------------------

const Gameboard = function(player1, player2) {   // Module Pattern
    
  const gameBoard = [
    ["", "", ""], 
    ["", "", ""], 
    ["", "", ""]
  ];

  const containerUI = document.querySelector(".container");
  
  const gameBoardUI = document.createElement("div");
  
  gameBoardUI.classList.add("gameboard");
    
  function printArray() {
    for (let i = 0; i < 3; i++) {
      console.log(gameBoard[i]);
    }
  }
  
  function createGameBoardUI() {
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
  }

  function isThereAPiece(row, column) {
    return (gameBoard[row][column] !== "") ? true : false;
  }

  function insertPiece(numberOfPlayer, row, column) {
    gameBoard[row][column] = (numberOfPlayer === 1) ? "X" : "O";
  }

  function resetArray() {
    for (let i = 0; i < 3; i++) {
      gameBoard[i].fill("O");
    }
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

  function whoWin() {
    return isThereAWinner().player;
  }

  return {
    printArray,
    printGameBoardUI,
    isThereAPiece,
    insertPiece,
    resetArray,
    isThereAWinner,
    whoWin,
  };

};


//--------------------------MAIN-----------------------------


function main() {
  
  const player1 = Player(1);
  const player2 = Player(2);
  const gameboard = Gameboard(player1, player2);

  const gameBoardContainer = document.querySelector(".gameboard");
  
  

};

main();






