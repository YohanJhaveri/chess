import BR from "images/BR.png";
import BN from "images/BN.png";
import BB from "images/BB.png";
import BQ from "images/BQ.png";
import BK from "images/BK.png";
import BP from "images/BP.png";

import WR from "images/WR.png";
import WN from "images/WN.png";
import WB from "images/WB.png";
import WQ from "images/WQ.png";
import WK from "images/WK.png";
import WP from "images/WP.png";

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

const IMAGES = {
  BR,
  BN,
  BB,
  BQ,
  BK,
  BP,
  WR,
  WN,
  WB,
  WQ,
  WK,
  WP,
};

const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"];
const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

export { INITIAL, SQUARES, IMAGES, RANKS, FILES };
