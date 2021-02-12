import React from "react";
import styled from "styled-components";

import Buttons from "components/Buttons";

function Settings({
  active,
  time,
  setTime,
  handleBack,
  handleNext,
  handleStart,
}) {
  const options = [60, 30, 10, 5, 3, 1];

  return active ? (
    <Buttons handleBack={handleBack} handleNext={handleNext} />
  ) : (
    <>
      <Flex>
        {options.map((option, index) => (
          <Tab
            key={index}
            selected={option === time}
            onClick={() => setTime(option)}
          >
            {`${option} min`}
          </Tab>
        ))}
      </Flex>
      <StartButton onClick={handleStart}>Start Game</StartButton>
    </>
  );
}

const Flex = styled.div`
  display: flex;
  grid-gap: 8px;

  & > * {
    flex: 1;
  }
`;

const Tab = styled.button`
  font-size: 1rem;
  font-weight: 500;
  padding: 8px;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  color: ${(props) => (props.selected ? "white" : "white")};
  background: ${(props) =>
    props.selected ? "rgba(204, 128, 64)" : "rgba(255, 255, 255, 0.05)"};
`;

const StartButton = styled.button`
  color: white;
  border: none;
  border-radius: 0.25rem;
  background: rgb(135, 164, 91);
  font-size: 1.25rem;
  font-weight: 600;
  padding: 12px;
`;

export default Settings;
