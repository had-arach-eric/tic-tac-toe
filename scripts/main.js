import { Player } from "./player.js";
import { Gameboard } from "./gameboard.js";

(function main() {
  
  const player1 = Player("Eric", 1);
  const player2 = Player("Pep", 2);
  const gameboard = Gameboard(player1, player2);

  let playerActive = 1;

  //Node references
  const gameBoardUI = document.querySelector(".gameboard");
  const nextRoundUI = document.querySelector(".next-round");
  const resetGameUI = document.querySelector(".reset-game");
  const player1PointsUI = document.querySelector(".player1-points");
  const player2PointsUI = document.querySelector(".player2-points");

  for (let i = 0; i < 9; i++) {
    gameBoardUI.children[i].addEventListener("click", e => {
      let row = e.target.dataset.row;
      let column = e.target.dataset.column;

      if (gameboard.isThereAPiece(row, column) === false) {
        gameboard.insertPiece(playerActive, row, column);
        if (gameboard.isThereAWinner.result === true) {
          console.log(`Ganó el jugador número ${playerActive}`);
        }
      }
    });
  }

  resetGameUI.addEventListener("click", gameboard.handleResetGame);

})();






