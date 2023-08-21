export function Player(number) {   // Factory Function
  
  let score = 0;

  /*function getName() {
    return name;
  }*/

  function addOnePoint() {
    score++;
  }

  function getPoints() {
    return score;
  }

  function resetPoints() {
    score = 0;
  }

  return {
    addOnePoint,
    getPoints,
    resetPoints,
  };
}