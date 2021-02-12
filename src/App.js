import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Board from "components/Board";
import Clock from "components/Clock";
import Settings from "components/Settings";

import {
  makeDeepCopyBoard,
  getCoordinates,
  getPossibleMoves,
} from "functions/helpers";

import { AUDIO, INITIAL } from "./functions/constants";

function App() {
  // GAME BASED
  const moveSelfAudio = new Audio(AUDIO.moveSelf);
  const moveOpponentAudio = new Audio(AUDIO.moveOpponent);
  const captureAudio = new Audio(AUDIO.capture);
  const gameStartAudio = new Audio(AUDIO.gameStart);
  const gameEndAudio = new Audio(AUDIO.gameEnd);

  const [time, setTime] = useState(10);
  const [active, setActive] = useState(false);
  const [state, setState] = useState([INITIAL]);
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState("");
  const [clock, setClock] = useState([600, 600]);
  const [winner, setWinner] = useState("");

  // TURN BASED
  const [selectedSquare, setSelectedSquare] = useState("");
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [countdownInterval, setCountdownInterval] = useState();

  // SET CLOCK
  useEffect(() => {
    const seconds = time * 60;
    setClock([seconds, seconds]);
  }, [time]);

  // TRIGGER COUNTDOWN
  useEffect(() => {
    clearInterval(countdownInterval);

    if (turn) {
      setCountdownInterval(() =>
        setInterval(() => {
          setClock((prev) => {
            const updated = [...prev];
            if (turn === "W") updated[0] -= 1;
            if (turn === "B") updated[1] -= 1;
            if (updated[0] === 0) handleEnd("B");
            if (updated[1] === 0) handleEnd("W");
            return updated;
          });
        }, 1000)
      );
    }
  }, [turn]);

  // WINNER ANNOUNCEMENT
  useEffect(() => {
    if (winner) {
      alert(`${winner === "W" ? "White" : "Black"} wins!`);
    }
  }, [winner]);

  const handleStart = () => {
    setWinner("");
    setTurn("W");
    setActive(true);
    gameStartAudio.play();
  };

  const handleEnd = (winner) => {
    setWinner(winner);
    setTurn("");
    setActive(false);
    gameEndAudio.play();
  };

  const handleMove = (origin, destination) => {
    const [x0, y0] = getCoordinates(origin);
    const [x1, y1] = getCoordinates(destination);

    if (state[state.length - 1][x1][y1] !== "") {
      captureAudio.play();
    } else {
      if (turn === "W") {
        moveSelfAudio.play();
      } else {
        moveOpponentAudio.play();
      }
    }

    setState((prev) => {
      const board = makeDeepCopyBoard(prev[prev.length - 1]);
      board[x1][y1] = board[x0][y0];
      board[x0][y0] = "";
      setIndex((prev) => prev + 1);
      return prev.concat([board]);
    });
  };

  const handleClick = (square) => {
    if (index !== state.length - 1) return;

    const [x, y] = getCoordinates(square);
    const board = state[state.length - 1];
    const [color] = board[x][y].split("");

    if (color === turn) {
      if (square === selectedSquare) {
        setSelectedSquare("");
        setPossibleMoves([]);
        return;
      }

      setSelectedSquare(square);
      setPossibleMoves(getPossibleMoves(board, square));
      return;
    }

    if (possibleMoves.includes(square)) {
      handleMove(selectedSquare, square);
      setTurn((prevTurn) => (prevTurn === "W" ? "B" : "W"));
    }

    setSelectedSquare("");
    setPossibleMoves([]);
  };

  const handleBack = () => {
    setIndex((prev) => prev - (prev > 0));
  };

  const handleNext = () => {
    setIndex((prev) => prev + (prev < state.length - 1));
  };

  return (
    <Page>
      <Clock clock={clock} />
      <Board
        board={state[index]}
        selectedSquare={selectedSquare}
        possibleMoves={possibleMoves}
        handleClick={handleClick}
      />
      <Settings
        active={active}
        time={time}
        setTime={setTime}
        handleBack={handleBack}
        handleNext={handleNext}
        handleStart={handleStart}
      />
    </Page>
  );
}

const Page = styled.div`
  display: grid;
  grid-gap: 15px;
  width: 512px;
`;

export default App;
