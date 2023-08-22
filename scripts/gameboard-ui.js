import { Information } from "./information-ui.js";

export const GameboardUI = function(gameboard, player1, player2) { 
  
  const gameBoardUI = document.querySelector(".gameboard");
  const buttonResetUI = document.querySelector(".reset-button");
  const information = Information(player1, player2);

  let isEditable = true;

  information.setPlayersNamesUI();

  function setFontColor(val, cell) {
    if (val === "X") {
      cell.style.color = "green";
    }
    else if (val === "O") {
      cell.style.color = "red";
    }
  }

  function printGameBoardUI() {
    let counter = 0;
    while (counter < 9) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let val = gameboard.getValuePosition(i, j);
          let cell = gameBoardUI.children[counter];
          cell.textContent = val;
          setFontColor(val, cell);
          counter++;
        }
      }
    }
  }

  function changeEdition() {
    isEditable = !isEditable;
    for (let i = 0; i < 9; i++) {
      gameBoardUI.children[i].setAttribute("disabled", isEditable);
    }
  } 

  function setEditable() {
    isEditable = true;
    for (let i = 0; i < 9; i++) {
      gameBoardUI.children[i].removeAttribute("disabled");
    }
  }

  function handlePressCell(e) {
    let row = e.target.dataset.row;
    let column = e.target.dataset.column;
    if (gameboard.isThereAPiece(row, column) === false) {
      let numPlayerActive = (player1.getActive()) ? 1 : 2;
      gameboard.insertPiece(numPlayerActive, row, column);
      player1.turnActive();
      player2.turnActive();
      if (gameboard.isThereAWinner().result === true) {
        let winner = gameboard.isThereAWinner().player;
        changeEdition();
        if (winner === 1) {
          player1.addOnePoint();
        }
        else {
          player2.addOnePoint();
        }
        information.setPlayersPointsUI(player1.getPoints(), player2.getPoints());
      }
      printGameBoardUI();
    }
  }

  function handleResetButtonUI() {
    gameboard.resetArray();
    setEditable();
    printGameBoardUI();
    player1.setActive();
    player2.setInactive();
  }

  for (let i = 0; i < 9; i++) {
    gameBoardUI.children[i].addEventListener("click", handlePressCell);
  }

  buttonResetUI.addEventListener("click", handleResetButtonUI);
};