import pieceMoves from "./pieceMoves.js";

const chessboard = document.getElementById("chessboard");

const pieces = {
  white: {
    king: "♔",
    queen: "♕",
    rook: "♖",
    bishop: "♗",
    knight: "♘",
    pawn: "♙",
  },
  black: {
    king: "♚",
    queen: "♛",
    rook: "♜",
    bishop: "♝",
    knight: "♞",
    pawn: "♟",
  },
};

const initialBoard = [
  ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
  ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
  ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
];

let currentTurn = "white";

function createBoard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add((row + col) % 2 === 0 ? "white" : "brown");
      square.dataset.row = row;
      square.dataset.col = col;

      const piece = initialBoard[row][col];
      if (piece) {
        const pieceElement = document.createElement("div");
        pieceElement.classList.add("piece");
        pieceElement.dataset.color = row < 4 ? "white" : "black";
        pieceElement.textContent = pieces[row < 4 ? "white" : "black"][piece];
        pieceElement.draggable = true;
        square.appendChild(pieceElement);
      }

      chessboard.appendChild(square);
    }
  }
}

function isValidMove(targetSquare, piece) {
  return (
    (targetSquare.children.length === 0 ||
      targetSquare.children[0] === piece) &&
    piece.dataset.color === currentTurn
  );
}

function switchTurn() {
  currentTurn = currentTurn === "white" ? "black" : "white";
  console.log(`It's now ${currentTurn}'s turn`);
}

function implementDragAndDrop() {
  let draggedPiece = null;

  chessboard.addEventListener("dragstart", (e) => {
    if (
      e.target.classList.contains("piece") &&
      e.target.dataset.color === currentTurn
    ) {
      draggedPiece = e.target;
    } else {
      e.preventDefault();
    }
  });

  chessboard.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  chessboard.addEventListener("drop", (e) => {
    e.preventDefault();
    const targetSquare = e.target.closest(".square");

    if (
      targetSquare &&
      draggedPiece &&
      isValidMove(targetSquare, draggedPiece)
    ) {
      if (targetSquare.children.length > 0) {
        targetSquare.removeChild(targetSquare.children[0]);
      }
      targetSquare.appendChild(draggedPiece);
      switchTurn();
    } else if (draggedPiece) {
      draggedPiece.parentElement.appendChild(draggedPiece);
    }
  });
}

function implementTouchInteraction() {
  let selectedPiece = null;

  chessboard.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);

      if (
        element.classList.contains("piece") &&
        element.dataset.color === currentTurn
      ) {
        selectedPiece = element;
        selectedPiece.classList.add("selected");
      } else if (element.classList.contains("square") && selectedPiece) {
        if (isValidMove(element, selectedPiece)) {
          movePiece(element);
          switchTurn();
        } else {
          selectedPiece.classList.remove("selected");
          selectedPiece = null;
        }
      }
    },
    false
  );

  function movePiece(targetSquare) {
    if (targetSquare.children.length > 0) {
      targetSquare.removeChild(targetSquare.children[0]);
    }
    targetSquare.appendChild(selectedPiece);
    selectedPiece.classList.remove("selected");
    selectedPiece = null;
  }
}

createBoard();
implementDragAndDrop();
implementTouchInteraction();
