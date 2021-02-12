const INITIAL = [
  ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"],
  ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
  ["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"],
];

const SQUARES = [
  ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
  ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
  ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
  ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
  ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
  ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
  ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
  ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
];

const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"];
const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

const AUDIO = {
  gameStart: "https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/game-start.mp3",
  gameEnd: "https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/game-end.mp3",
  moveSelf: "https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-self.mp3",
  moveOpponent:
    "https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-opponent.mp3",
  moveCheck: "https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-check.mp3",
  capture: "https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/capture.mp3",
  castle: "https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/castle.mp3",
  premove: "https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/premove.mp3",
  notify: "https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/notify.mp3",
  promote: "https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/promote.mp3",
  tenseconds: "https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/tenseconds.mp3",
};

export { INITIAL, SQUARES, RANKS, FILES, AUDIO };
