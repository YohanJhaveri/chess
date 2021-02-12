import React from "react";
import styled from "styled-components";

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

import { getSquare } from "utils";

const IMAGE = {
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

function Board({ board, selectedSquare, possibleMoves, handleClick }) {
  return (
    <div>
      {board.map((row, x) => (
        <Row key={x}>
          {row.map((square, y) => (
            <Square
              key={y}
              color={(x + y) % 2 ? "rgb(84, 115, 150)" : "rgb(234, 233, 212)"}
              possible={possibleMoves.includes(getSquare(x, y))}
              selected={selectedSquare === getSquare(x, y)}
              onClick={() => handleClick(getSquare(x, y))}
            >
              {square && <Image src={IMAGE[square]} alt={square} />}
              {possibleMoves.includes(getSquare(x, y)) &&
                (square ? <PossiblePiece /> : <PossibleEmpty />)}
            </Square>
          ))}
          {/* <Label>{RANKS[x]}</Label> */}
        </Row>
      ))}
      {/* <Flex>
        {FILES.map((value) => (
          <Label>{value}</Label>
        ))}
      </Flex> */}
    </div>
  );
}

const Square = styled.div`
  height: 64px;
  width: 64px;
  background: ${(props) => props.color};
  background: ${(props) => props.selected && "#53b1dc"};
  background: ${(props) => props.previousOrigin && "lightsalmon"};
  background: ${(props) => props.previousDestination && "salmon"};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Row = styled.div`
  display: flex;

  &:first-child {
    & > ${Square} {
      &:first-child {
        border-top-left-radius: 0.25rem;
      }

      &:last-child {
        border-top-right-radius: 0.25rem;
      }
    }
  }

  &:last-child {
    & > ${Square} {
      &:first-child {
        border-bottom-left-radius: 0.25rem;
      }

      &:last-child {
        border-bottom-right-radius: 0.25rem;
      }
    }
  }
`;

const Image = styled.img`
  height: 64px;
  width: 64px;
`;

const PossibleEmpty = styled.div`
  height: 20px;
  width: 20px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  position: absolute;
`;

const PossiblePiece = styled.div`
  height: 48px;
  width: 48px;
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-radius: 48px;
  position: absolute;
`;

const Label = styled.div`
  height: 64px;
  width: 64px;
  font-family: Avenir;
  font-weight: 500;
  font-size: 1.5rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Flex = styled.div`
  display: flex;
`;

export default Board;
