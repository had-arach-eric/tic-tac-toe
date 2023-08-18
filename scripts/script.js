/*
Tu principal objetivo aquí es tener el menor código global posible. Trata de esconder todo dentro de un módulo o fábrica. Regla general: si sólo necesitas UNA cosa (gameBoard, displayController), utiliza un módulo. Si necesitas múltiplos de algo (¡jugadores!), créalos con fábricas.
*/

//NÚMEROS DE JUGADORES --> 1 y 2

//IDENTIFICACIÓN DE FICHAS --> 0 (ninguna), 1 (player1), 2 (player2)



//---------------------------------PLAYER---------------------------------

function Player(number) {   // Factory Function
    
  let name = prompt("Introduce tu nombre");
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

  return {
    getName,
    addPoint,
    getPoints,
  };
}


//---------------------------------GAMEBOARD---------------------------------

const Gameboard = function() {   // Module Pattern
    
  const gameBoard = [
    [0, 0, 0], 
    [0, 0, 0], 
    [0, 0, 0]
  ];
    
  function printGameboard() {
    for (let i = 0; i < 3; i++) {
      console.log(gameBoard[i]);
    }
  } 

  function insertPiece(numberOfPlayer, row, column) {
    gameBoard[row][column] = numberOfPlayer;
  }

  function resetGameBoard() {
    for (let i = 0; i < 3; i++) {
      gameBoard[i].fill(0);
    }
  }

  function isThereAPiece(row, column) {
    if (gameBoard[row][column] !== 0) {
      return false;
    }
    else {
      return true;
    }
  }

  function checkRow(row) {   //una fila es un array unidimensional
    let result = false;
    if (gameBoard[row].every(element => element === 1)) {
      result = true;
    }
    else if (gameBoard[row].every(element => element === 2)) {
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
    if (auxArray.every(element => element === 1)) {
      result = true;
    }
    else if (auxArray.every(element => element === 2)) {
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
    if (auxArray.every(element => element === 1)) {
      result = true;
    }
    else if (auxArray.every(element => element === 2)) {
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
    if (auxArray.every(element => element === 1)) {
      result = true;
    }
    else if (auxArray.every(element => element === 2)) {
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
        player = gameBoard[i][0];
        break;
      }
      if (checkColumn(i)) {
        result = true;
        player = gameBoard[0][i];
        break;
      }
      if (checkXLeftStart()) {
        result = true;
        player = gameBoard[0][0];
        break;
      }
      if (checkXRightStart()) {
        result = true;
        player = gameBoard[2][2];
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
    printGameboard,
    insertPiece,
    resetGameBoard,
    isThereAPiece,
    isThereAWinner,
    whoWin,
  }

};


//---------------------------------------------------

function playRound(player1, player2) {
  
}

//--------------------------MAIN-----------------------------


function main() {
  let player1 = Player(1);
  let player2 = Player(2);
  let gameBoard = Gameboard();

  playRound(player1, player2);
};

main();






