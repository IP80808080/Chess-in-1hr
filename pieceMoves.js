// pieceMoves.js

const pieceMoves = {
  pawn: function (start, end, color) {
    const [startRow, startCol] = [
      parseInt(start.dataset.row),
      parseInt(start.dataset.col),
    ];
    const [endRow, endCol] = [
      parseInt(end.dataset.row),
      parseInt(end.dataset.col),
    ];

    // Direction of movement (1 for white moving up the board, -1 for black moving down)
    const direction = color === "white" ? -1 : 1;

    // Regular move: one square forward
    if (startCol === endCol && endRow === startRow + direction) {
      return true;
    }

    // First move: option to move two squares forward
    if (
      startCol === endCol &&
      ((color === "white" && startRow === 6 && endRow === 4) ||
        (color === "black" && startRow === 1 && endRow === 3))
    ) {
      return true;
    }

    // Capture: diagonally forward one square
    if (Math.abs(startCol - endCol) === 1 && endRow === startRow + direction) {
      // Only allow if there's an opponent's piece to capture
      if (end.children.length > 0 && end.children[0].dataset.color !== color) {
        return true;
      }
    }

    return false;
  },

  // We'll add other pieces here later
};

export default pieceMoves;
