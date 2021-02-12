import { RANKS, FILES, SQUARES } from "./constants";

const makeDeepCopyBoard = (original) => {
  return [
    [...original[0]],
    [...original[1]],
    [...original[2]],
    [...original[3]],
    [...original[4]],
    [...original[5]],
    [...original[6]],
    [...original[7]],
  ];
};

const getCoordinates = (square) => {
  const [file, rank] = square.split("");
  const x = RANKS.indexOf(rank);
  const y = FILES.indexOf(file);
  return [x, y];
};

const getPossibleMoves = (board, square) => {
  const [x, y] = getCoordinates(square);
  const [color, piece] = board[x][y].split("");

  if (piece === "R") return possibleMovesRook(board, [x, y], color);
  if (piece === "K") return possibleMovesKing(board, [x, y], color);
  if (piece === "B") return possibleMovesBishop(board, [x, y], color);
  if (piece === "N") return possibleMovesKnight(board, [x, y], color);
  if (piece === "Q") return possibleMovesQueen(board, [x, y], color);
  if (piece === "P") return possibleMovesPawn(board, [x, y], color);
  return [];
};

const isCoordinateValid = (x, y) => {
  return !(x < 0 || x > 7 || y < 0 || y > 7);
};

const isKingChecked = (board, color, origin, destination) => {
  const [x0, y0] = origin;
  const [x1, y1] = destination;

  const newBoard = makeDeepCopyBoard(board);
  newBoard[x1][y1] = newBoard[x0][y0];
  newBoard[x0][y0] = "";

  const flatIndex = newBoard.flat().indexOf(color + "K");
  const x = parseInt(flatIndex / 8);
  const y = parseInt(flatIndex % 8);

  return isSquareAttacked(newBoard, x, y, color);
};

const isSquareAttacked = (board, x, y, turn) => {
  const flags = [true, true, true, true, true, true, true, true];

  for (let i = 1; i < 8; i++) {
    const moves = [
      // PERPENDICULAR
      [x + i, y],
      [x - i, y],
      [x, y + i],
      [x, y - i],

      // DIAGONAL
      [x + i, y + i],
      [x + i, y - i],
      [x - i, y + i],
      [x - i, y - i],
    ];

    for (const m in moves) {
      const move = moves[m];
      if (isCoordinateValid(...move)) {
        const value = board[move[0]][move[1]];
        const [color, piece] = value.split("");
        if (flags[m] && value) {
          if (
            color !== turn &&
            ((i === 1 && piece === "K") || ["Q", parseInt(m) < 4 ? "R" : "B"].includes(piece))
          ) {
            return true;
          } else {
            flags[m] = false;
          }
        }
      }
    }

    const knight = [
      [x + 1, y + 2],
      [x - 1, y + 2],
      [x + 1, y - 2],
      [x - 1, y - 2],

      [x + 2, y + 1],
      [x - 2, y + 1],
      [x + 2, y - 1],
      [x - 2, y - 1],
    ];

    for (const i of knight) {
      if (isCoordinateValid(...i)) {
        const [color, piece] = board[i[0]][i[1]].split("");
        if (color !== turn && piece === "N") {
          return true;
        }
      }
    }
  }

  return false;
};

const isCapture = (board, color, destination) => {
  const [x, y] = destination;
  const pieceColor = board[x][y].charAt(0);
  return pieceColor === (color === "W" ? "B" : "W");
};

const isMovePossible = (board, color, origin, destination) => {
  const [x1, y1] = destination;
  if (!isCoordinateValid(x1, y1)) return false;
  if (board[x1][y1].charAt(0) === color) return false;
  if (isKingChecked(board, color, origin, destination)) return false;
  return true;
};

const possibleMovesRook = (board, origin, color) => {
  const isValid = (board, color, origin, destination) => {
    if (isMovePossible(board, color, origin, destination)) {
      return [true, !isCapture(board, color, destination)];
    } else {
      return [false, false];
    }
  };

  const possible = [];

  const [x, y] = origin;
  let flags = [true, true, true, true];

  for (let i = 1; i < 8; i++) {
    const moves = [
      [x - i, y],
      [x + i, y],
      [x, y - i],
      [x, y + i],
    ];

    for (const m in moves) {
      if (flags[m]) {
        const move = moves[m];
        const [valid, flag] = isValid(board, color, origin, move);
        if (valid) possible.push(SQUARES[move[0]][move[1]]);
        flags[m] = flag;
      }
    }
  }

  return possible;
};

const possibleMovesKing = (board, origin, color) => {
  const possible = [];

  const [x, y] = origin;

  const moves = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
    [x + 1, y + 1],
    [x + 1, y - 1],
    [x - 1, y + 1],
    [x - 1, y - 1],
  ];

  for (const move of moves) {
    if (isMovePossible(board, color, origin, move)) {
      possible.push(SQUARES[move[0]][move[1]]);
    }
  }

  return possible;
};

const possibleMovesBishop = (board, origin, color) => {
  const isValid = (board, color, origin, destination) => {
    if (isMovePossible(board, color, origin, destination)) {
      return [true, !isCapture(board, color, destination)];
    } else {
      return [false, false];
    }
  };

  const possible = [];
  const [x, y] = origin;
  let flags = [true, true, true, true];

  for (let i = 1; i < 8; i++) {
    const moves = [
      [x - i, y - i],
      [x - i, y + i],
      [x + i, y - i],
      [x + i, y + i],
    ];

    for (const m in moves) {
      if (flags[m]) {
        const move = moves[m];
        const [valid, flag] = isValid(board, color, origin, move);
        if (valid) possible.push(SQUARES[move[0]][move[1]]);
        flags[m] = flag;
      }
    }
  }

  return possible;
};

const possibleMovesKnight = (board, origin, color) => {
  const possible = [];
  const [x, y] = origin;

  const moves = [
    [x + 1, y + 2],
    [x - 1, y + 2],
    [x + 1, y - 2],
    [x - 1, y - 2],

    [x + 2, y + 1],
    [x - 2, y + 1],
    [x + 2, y - 1],
    [x - 2, y - 1],
  ];

  for (const move of moves) {
    if (isMovePossible(board, color, origin, move)) {
      possible.push(SQUARES[move[0]][move[1]]);
    }
  }

  return possible;
};

const possibleMovesQueen = (board, x, y, color) => {
  const bishopMoves = possibleMovesBishop(board, x, y, color);
  const rookMoves = possibleMovesRook(board, x, y, color);
  return bishopMoves.concat(rookMoves);
};

const possibleMovesPawn = (board, origin, color) => {
  const possible = [];
  const [x, y] = origin;

  if (color === "W") {
    if (x === 6 && isCoordinateValid(x - 2, y)) {
      if (board[x - 2][y] === "") {
        if (!isKingChecked(board, color, origin, [x - 2, y])) {
          possible.push(SQUARES[x - 2][y]);
        }
      }
    }

    if (isCoordinateValid(x - 1, y)) {
      if (board[x - 1][y] === "") {
        if (!isKingChecked(board, color, origin, [x - 1, y])) {
          possible.push(SQUARES[x - 1][y]);
        }
      }
    }

    if (isCoordinateValid(x - 1, y - 1)) {
      if (board[x - 1][y - 1].charAt(0) === "B") {
        if (!isKingChecked(board, color, origin, [x - 1, y - 1])) {
          possible.push(SQUARES[x - 1][y - 1]);
        }
      }
    }

    if (isCoordinateValid(x - 1, y + 1)) {
      if (board[x - 1][y + 1].charAt(0) === "B") {
        if (!isKingChecked(board, color, origin, [x - 1, y + 1])) {
          possible.push(SQUARES[x - 1][y + 1]);
        }
      }
    }
  }

  if (color === "B") {
    if (x === 1 && isCoordinateValid(x + 2, y)) {
      if (board[x + 2][y] === "") {
        if (!isKingChecked(board, color, origin, [x + 2, y])) {
          possible.push(SQUARES[x + 2][y]);
        }
      }
    }

    if (isCoordinateValid(x + 1, y)) {
      if (board[x + 1][y] === "") {
        if (!isKingChecked(board, color, origin, [x + 1, y])) {
          possible.push(SQUARES[x + 1][y]);
        }
      }
    }

    if (isCoordinateValid(x + 1, y - 1)) {
      if (board[x + 1][y - 1].charAt(0) === "W") {
        if (!isKingChecked(board, color, origin, [x + 1, y - 1])) {
          possible.push(SQUARES[x + 1][y - 1]);
        }
      }
    }

    if (isCoordinateValid(x + 1, y + 1)) {
      if (board[x + 1][y + 1].charAt(0) === "W") {
        if (!isKingChecked(board, color, origin, [x + 1, y + 1])) {
          possible.push(SQUARES[x + 1][y + 1]);
        }
      }
    }
  }

  return possible;
};

export { makeDeepCopyBoard, getCoordinates, getPossibleMoves };
