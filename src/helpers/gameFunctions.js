export function setPlayerLocalStorage(answerPoints, player) {
  let playerAux = { ...player };
  playerAux = { ...playerAux, score: answerPoints };
  localStorage.setItem('player', JSON.stringify({ playerAux }));
}

export function difficultyFormula(difficulty) {
  const hard = 3;
  const medium = 2;
  const easy = 1;
  switch (difficulty) {
  case 'hard':
    return hard;
  case 'medium':
    return medium;
  default:
    return easy;
  }
}
