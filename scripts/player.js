export function Player(number) {   // Factory Function
  
  let name = prompt(`Enter the name of the player number ${number}`);
  let score = 0;
  let isActive = (number === 1) ? true : false;

  function getName() {
    return name;
  }

  function addOnePoint() {
    score++;
  }

  function setPoints(points) {
    score = points;
  }

  function getPoints() {
    return score;
  }

  function resetPoints() {
    score = 0;
  }

  function turnActive() {
    isActive = !isActive;
  }

  function setActive() {
    isActive = true;
  }

  function setInactive() {
    isActive = false;
  }

  function getActive() {
    return isActive;
  }

  return {
    getName,
    addOnePoint,
    getPoints,
    setPoints,
    resetPoints,
    turnActive,
    setActive,
    setInactive,
    getActive,
  };
};