import { IMAGES, SQUARES, RANKS, FILES } from "./constants";

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

const getSquare = (x, y) => {
  return SQUARES[x][y];
};

const getImage = (piece) => {
  return IMAGES[piece];
};

const isCoordinateValid = (x, y) => {
  return 0 <= x && x <= 7 && 0 <= y && y <= 7;
};

const isKingChecked = (board, color) => {
  const flatIndex = board.flat().indexOf(color + "K");
  const x = parseInt(flatIndex / 8);
  const y = parseInt(flatIndex % 8);
  return isSquareAttacked(board, x, y, color);
};

const isMovePossible = (board, origin, destination, color) => {
  const [x0, y0] = origin;
  const [x1, y1] = destination;

  const newBoard = makeDeepCopyBoard(board);
  newBoard[x1][y1] = newBoard[x0][y0];
  newBoard[x0][y0] = "";

  // check if coordinates are valid
  if (isCoordinateValid(x1, y1)) {
    // check that players own piece is not on destination square
    if (board[x1][y1].charAt(0) !== color) {
      // check that move doesn't result in a check
      if (!isKingChecked(newBoard, color)) {
        return true;
      }
    }
  }

  // check if coordinates are valid
  // check if players own piece is on square
  // check that move doesn't result in a check
};

const isSquareAttacked = (board, x, y, color) => {
  let i = 0;
  while (i < 8) {
    // queens, rooks and bishops
    const perpendicular = [
      [x + i, y],
      [x - i, y],
      [x, y + i],
      [x, y - i],
    ];

    const diagonal = [
      [x + i, y + i],
      [x + i, y - i],
      [x - i, y + i],
      [x - i, y - i],
    ];

    for (const i of perpendicular) {
      if (isCoordinateValid(...i)) {
        const piece = board[i[0]][i[1]].charAt(1);
        if (piece === "Q" || piece === "R") {
          return true;
        }
        // king
        if (i === 1 && piece === "K") {
          return true;
        }
      }
    }

    for (const i of diagonal) {
      if (isCoordinateValid(...i)) {
        const piece = board[i[0]][i[1]].charAt(1);
        if (piece === "Q" || piece === "B") {
          return true;
        }
        // king
        if (i === 1 && piece === "K") {
          return true;
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
        const piece = board[i[0]][i[1]].charAt(1);
        if (piece === "N") {
          return true;
        }
      }
    }

    // pawn
    if (color === "W") {
      if (
        isCoordinateValid(x - 1, y + 1) &&
        board[x - 1][y + 1].charAt(1) === "P"
      ) {
        return true;
      }

      if (
        isCoordinateValid(x - 1, y - 1) &&
        board[x - 1][y - 1].charAt(1) === "P"
      ) {
        return true;
      }
    }

    if (color === "B") {
      if (
        isCoordinateValid(x + 1, y + 1) &&
        board[x + 1][y + 1].charAt(1) === "P"
      ) {
        return true;
      }

      if (
        isCoordinateValid(x + 1, y - 1) &&
        board[x + 1][y - 1].charAt(1) === "P"
      ) {
        return true;
      }
    }
    i++;
  }

  return false;
};

const getPossibleMovesPawn = (board, x, y, color) => {
  const possible = [];

  if (color === "W") {
    if (x === 6 && isCoordinateValid(x - 2, y)) {
      if (board[x - 2][y] === "") {
        possible.push(getSquare(x - 2, y));
      }
    }

    if (isCoordinateValid(x - 1, y)) {
      if (board[x - 1][y] === "") {
        possible.push(getSquare(x - 1, y));
      }
    }

    if (isCoordinateValid(x - 1, y - 1)) {
      if (board[x - 1][y - 1].charAt(0) === "B") {
        possible.push(getSquare(x - 1, y - 1));
      }
    }

    if (isCoordinateValid(x - 1, y + 1)) {
      if (board[x - 1][y + 1].charAt(0) === "B") {
        possible.push(getSquare(x - 1, y + 1));
      }
    }
  }

  if (color === "B") {
    if (x === 1 && isCoordinateValid(x + 2, y)) {
      if (board[x + 2][y] === "") {
        possible.push(getSquare(x + 2, y));
      }
    }

    if (isCoordinateValid(x + 1, y)) {
      if (board[x + 1][y] === "") {
        possible.push(getSquare(x + 1, y));
      }
    }

    if (isCoordinateValid(x + 1, y - 1)) {
      if (board[x + 1][y - 1].charAt(0) === "W") {
        possible.push(getSquare(x + 1, y - 1));
      }
    }

    if (isCoordinateValid(x + 1, y + 1)) {
      if (board[x + 1][y + 1].charAt(0) === "W") {
        possible.push(getSquare(x + 1, y + 1));
      }
    }
  }

  return possible;
};

const getPossibleMovesRook = (board, x, y, color) => {
  const possible = [];

  let flagA = true;
  let flagB = true;
  let flagC = true;
  let flagD = true;

  let i = 1;
  while (i < 8) {
    const a = x + i;
    const b = x - i;
    const c = y + i;
    const d = y - i;

    i++;

    if (flagA && a <= 7) {
      const squareA = getSquare(a, y);
      const valueA = board[a][y];

      if (valueA === "") {
        possible.push(squareA);
      } else {
        if (valueA.charAt(0) !== color) {
          possible.push(squareA);
        }
        flagA = false;
      }
    }

    if (flagB && b >= 0) {
      const squareB = getSquare(b, y);
      const valueB = board[b][y];

      if (valueB === "") {
        possible.push(squareB);
      } else {
        if (valueB.charAt(0) !== color) {
          possible.push(squareB);
        }
        flagB = false;
      }
    }

    if (flagC && c <= 7) {
      const squareC = getSquare(x, c);
      const valueC = board[x][c];

      if (valueC === "") {
        possible.push(squareC);
      } else {
        if (valueC.charAt(0) !== color) {
          possible.push(squareC);
        }
        flagC = false;
      }
    }

    if (flagD && d >= 0) {
      const squareD = getSquare(x, d);
      const valueD = board[x][d];

      if (valueD === "") {
        possible.push(squareD);
      } else {
        if (valueD.charAt(0) !== color) {
          possible.push(squareD);
        }
        flagD = false;
      }
    }
  }

  return possible;
};

const getPossibleMovesBishop = (board, x, y, color) => {
  const possible = [];

  let flagA = true;
  let flagB = true;
  let flagC = true;
  let flagD = true;

  let i = 1;
  while (i < 8) {
    const a = [x + i, y + i];
    const b = [x + i, y - i];
    const c = [x - i, y + i];
    const d = [x - i, y - i];

    i++;

    if (flagA && isCoordinateValid(...a)) {
      const square = getSquare(...a);
      const value = board[a[0]][a[1]];

      if (value === "") {
        possible.push(square);
      } else {
        if (value.charAt(0) !== color) {
          possible.push(square);
        }
        flagA = false;
      }
    }

    if (flagB && isCoordinateValid(...b)) {
      const square = getSquare(...b);
      const value = board[b[0]][b[1]];

      if (value === "") {
        possible.push(square);
      } else {
        if (value.charAt(0) !== color) {
          possible.push(square);
        }
        flagB = false;
      }
    }

    if (flagC && isCoordinateValid(...c)) {
      const square = getSquare(...c);
      const value = board[c[0]][c[1]];

      if (value === "") {
        possible.push(square);
      } else {
        if (value.charAt(0) !== color) {
          possible.push(square);
        }
        flagC = false;
      }
    }

    if (flagD && isCoordinateValid(...d)) {
      const square = getSquare(...d);
      const value = board[d[0]][d[1]];

      if (value === "") {
        possible.push(square);
      } else {
        if (value.charAt(0) !== color) {
          possible.push(square);
        }
        flagD = false;
      }
    }
  }

  return possible;
};

const getPossibleMovesKing = (board, x, y, color) => {
  const possible = [];

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
    if (isCoordinateValid(...move)) {
      if (
        (board[move[0]][move[1]] === "" ||
          board[move[0]][move[1]].charAt(0) !== color) &&
        isMovePossible(board, [x, y], move, color)
      ) {
        possible.push(getSquare(...move));
      }
    }
  }

  return possible;
};

const getPossibleMovesKnight = (board, x, y, color) => {
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

  const possible = [];

  for (const i of knight) {
    if (isCoordinateValid(...i)) {
      const square = board[i[0]][i[1]];
      if (square === "" || square.charAt(0) !== color) {
        possible.push(getSquare(...i));
      }
    }
  }

  return possible;
};

const getPossibleMovesQueen = (board, x, y, color) => {
  const bishopMoves = getPossibleMovesBishop(board, x, y, color);
  const rookMoves = getPossibleMovesRook(board, x, y, color);
  return bishopMoves.concat(rookMoves);
};

const getPossibleMoves = (board, square) => {
  const [x, y] = getCoordinates(square);
  const [color, piece] = board[x][y].split("");

  switch (piece) {
    case "R":
      return getPossibleMovesRook(board, x, y, color);
    case "P":
      return getPossibleMovesPawn(board, x, y, color);
    case "B":
      return getPossibleMovesBishop(board, x, y, color);
    case "K":
      return getPossibleMovesKing(board, x, y, color);
    case "N":
      return getPossibleMovesKnight(board, x, y, color);
    case "Q":
      return getPossibleMovesQueen(board, x, y, color);
    default:
      return [];
  }
};

export {
  getImage,
  getSquare,
  getCoordinates,
  getPossibleMoves,
  makeDeepCopyBoard,
};
