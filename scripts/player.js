export function Player(number) {   // Factory Function
  
  let score = 0;
  let isActive = (number === 1) ? true : false;

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

  function setActive() {
    isActive = !isActive;
  }

  function getActive() {
    return isActive;
  }

  return {
    addOnePoint,
    getPoints,
    resetPoints,
    setActive,
    getActive,
  };
}