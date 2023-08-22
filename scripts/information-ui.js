export const Information = function(player1, player2) {
  
  function setPlayersNamesUI() { 
    const player1Name = document.querySelector(".player1-name");
    const player2Name = document.querySelector(".player2-name");
    player1Name.textContent = `${player1.getName()}: `;
    player2Name.textContent = `${player2.getName()}: `;
  }

  function setPlayersPointsUI(player1Score, player2Score) {
    const player1ScoreUI = document.querySelector(".player1-points");
    const player2ScoreUI = document.querySelector(".player2-points");
    player1ScoreUI.textContent = player1Score.toString();
    player2ScoreUI.textContent = player2Score.toString();
  }

  return {
    setPlayersNamesUI,
    setPlayersPointsUI,
  };
}

