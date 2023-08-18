/*
Tu principal objetivo aquí es tener el menor código global posible. Trata de esconder todo dentro de un módulo o fábrica. Regla general: si sólo necesitas UNA cosa (gameBoard, displayController), utiliza un módulo. Si necesitas múltiplos de algo (¡jugadores!), créalos con fábricas.
*/

//NÚMEROS DE JUGADORES --> 0 y 1

function main() {

  let otherRound = true;
  
  //---------------------------------PLAYER---------------------------------
    function Player() {
      
      let name;
      let score = 0;
  
      function setName() {
        name = prompt("Introduce tu nombre");
      }
  
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
  
      };
    }
  
  
    //---------------------------------GAMEBOARD---------------------------------
    const Gameboard = (function() {
      
      const gameBoard = [
        [0, 0, 0], 
        [0, 0, 0], 
        [0, 0, 0]
      ];
      
      function printArray() {
        for (let i = 0; i < 3; i++) {
          console.log(gameBoard[i]);
        }
      } 
  
      printArray();
  
      function insertPiece(numberOfPlayer, row, column) {
        gameBoard[row][column] = numberOfPlayer;
      }
  
      function resetGameBoard() {
        for (let i = 0; i < 3; i++) {
          gameBoard[i].fill(0);
        }
      }
  
      resetGameBoard();
      printArray();
  
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
        if (gameBoard.every(element => element === 1)) {
          result = true;
        }
        else if (gameBoard.every(element => element === 2)) {
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
  
    })();
  
  }
  
  main();