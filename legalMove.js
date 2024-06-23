export function isValidPawnMove(
  startRow,
  startCol,
  endRow,
  endCol,
  piece,
  targetPiece
) {
  const color = piece.dataset.color;
  const direction = color === "white" ? 1 : -1;
  if (startCol === endCol && endRow === startRow + direction && !targetPiece) {
    return true;
  }

  const startingRow = color === "white" ? 1 : 6;
  if (
    startCol === endCol &&
    startRow === startingRow &&
    endRow === startRow + 2 * direction &&
    !targetPiece
  ) {
    return true;
  }

  if (
    Math.abs(startCol - endCol) === 1 &&
    endRow === startRow + direction &&
    targetPiece &&
    targetPiece.dataset.color !== color
  ) {
    return true;
  }

  return false;
}

export function isValidRookMove(
  startRow,
  startCol,
  endRow,
  endCol,
  piece,
  board
) {
  if (startRow !== endRow && startCol !== endCol) return false;

  if (startRow === endRow) {
    const direction = startCol < endCol ? 1 : -1;
    for (let col = startCol + direction; col !== endCol; col += direction) {
      if (board[startRow][col]) return false;
    }
  } else {
    const direction = startRow < endRow ? 1 : -1;
    for (let row = startRow + direction; row !== endRow; row += direction) {
      if (board[row][startCol]) return false;
    }
  }

  return true;
}

export function isValidKnightMove(startRow, startCol, endRow, endCol) {
  const rowDiff = Math.abs(startRow - endRow);
  const colDiff = Math.abs(startCol - endCol);
  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
}

export function isValidBishopMove(
  startRow,
  startCol,
  endRow,
  endCol,
  piece,
  board
) {
  if (Math.abs(startRow - endRow) !== Math.abs(startCol - endCol)) return false;

  const rowDirection = startRow < endRow ? 1 : -1;
  const colDirection = startCol < endCol ? 1 : -1;
  let row = startRow + rowDirection;
  let col = startCol + colDirection;
  while (row !== endRow && col !== endCol) {
    if (board[row][col]) return false;
    row += rowDirection;
    col += colDirection;
  }

  return true;
}

export function isValidQueenMove(
  startRow,
  startCol,
  endRow,
  endCol,
  piece,
  board
) {
  return (
    isValidRookMove(startRow, startCol, endRow, endCol, piece, board) ||
    isValidBishopMove(startRow, startCol, endRow, endCol, piece, board)
  );
}

export function isValidKingMove(startRow, startCol, endRow, endCol) {
  const rowDiff = Math.abs(startRow - endRow);
  const colDiff = Math.abs(startCol - endCol);
  return rowDiff <= 1 && colDiff <= 1;
}
