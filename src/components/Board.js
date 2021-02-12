import React from "react";
import styled from "styled-components";

import { getSquare, getImage } from "functions";

function Board({ board, selectedSquare, possibleMoves, handleClick }) {
  const black = "rgb(84, 115, 150)";
  const white = "rgb(234, 233, 212)";

  return (
    <div>
      {board.map((row, x) => (
        <Row key={x}>
          {row.map((piece, y) => {
            const square = getSquare(x, y);
            const image = getImage(piece);
            const color = (x + y) % 2 ? black : white;
            const selected = selectedSquare === square;

            return (
              <Square
                key={y}
                color={color}
                selected={selected}
                onClick={() => handleClick(square)}
              >
                {piece && <Image src={image} alt={piece} />}
                {possibleMoves.includes(square) &&
                  (piece ? <PossiblePiece /> : <PossibleEmpty />)}
              </Square>
            );
          })}
        </Row>
      ))}
    </div>
  );
}

const Square = styled.div`
  height: 64px;
  width: 64px;
  background: ${(props) => props.color};
  background: ${(props) => props.selected && "#53b1dc"};
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

export default Board;
