import { Player } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { GameboardUI } from "./gameboard-ui.js";

(function main() {
  const player1 = Player(1);
  const player2 = Player(2);
  const gameboard = Gameboard(player1, player2);
  GameboardUI(gameboard, player1, player2);
})();
