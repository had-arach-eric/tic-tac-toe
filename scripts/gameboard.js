export const Gameboard = function(player1, player2) {   // Module Pattern
    
  const gameBoard = [
    ["", "", ""], 
    ["", "", ""], 
    ["", "", ""]
  ];

  function getValuePosition(row, column) {
    return gameBoard[row][column];
  }

  function printArray() {
    console.log("----------------");
    for (let i = 0; i < 3; i++) {
      console.log(gameBoard[i]);
    }
    console.log("----------------");
  }

  function isThereAPiece(row, column) {
    return (gameBoard[row][column] !== "") ? true : false;
  }

  function insertPiece(numberOfPlayer, row, column) {
    gameBoard[row][column] = (numberOfPlayer === 1) ? "X" : "O";
    printArray();
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

  return {
    printArray,
    isThereAPiece,
    insertPiece,
    resetArray,
    isThereAWinner,
    getValuePosition,
  };
};