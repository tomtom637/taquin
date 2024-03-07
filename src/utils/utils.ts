export function shuffle<T>(array: T[]) {
  const arrayCopy = JSON.parse(JSON.stringify(array));
  let currentIndex: number = arrayCopy.length;
  let randomIndex: number;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex], arrayCopy[currentIndex]];
  }
  return arrayCopy;
}

export function buildTaquinBoard(width: number, height: number): number[] {
  const board: number[] = [];
  for (let i = 0; i < width * height; i++) {
    board.push(i);
  }
  return shuffle(board);
}

export function isNeighborToZero(board: number[], boardWidth: number, value: number) {
  if (value === 0) return false;
  const indexOfZero = board.indexOf(0);
  const zeroRowIndex = Math.floor(indexOfZero / boardWidth);
  const zeroColumnIndex = indexOfZero % boardWidth;
  const valueIndex = board.indexOf(value);
  const valueRowIndex = Math.floor(valueIndex / boardWidth);
  const valueColumnIndex = valueIndex % boardWidth;
  return (
    (zeroRowIndex === valueRowIndex && Math.abs(zeroColumnIndex - valueColumnIndex) === 1) ||
    (zeroColumnIndex === valueColumnIndex && Math.abs(zeroRowIndex - valueRowIndex) === 1)
  );
}

export function isSolved(board: number[]) {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== i + 1) return false;
  }
  return true;
}