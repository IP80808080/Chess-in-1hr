export function handleCapture(targetSquare, draggedPiece) {
  const targetPiece = targetSquare.children[0];

  // Check if the target piece is of the same color
  if (targetPiece && targetPiece.dataset.color === draggedPiece.dataset.color) {
    console.log(
      `Invalid move: Cannot capture your own piece at (${targetSquare.dataset.row}, ${targetSquare.dataset.col})`
    );
    return false; // Cannot move to this square
  }

  if (targetPiece && targetPiece.dataset.color !== draggedPiece.dataset.color) {
    // Remove the target piece from the board
    targetSquare.removeChild(targetPiece);
    console.log(
      `Captured piece: ${targetPiece.textContent} at (${targetSquare.dataset.row}, ${targetSquare.dataset.col})`
    );
  }

  return true; // Valid move
}
