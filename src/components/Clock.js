import React from "react";
import styled from "styled-components";

function Clock({ clock }) {
  const convertToMinute = (seconds) => {
    const min = parseInt(seconds / 60);
    const sec = parseInt(seconds % 60);

    const padMin = min < 10;
    const padSec = sec < 10;

    return `${padMin ? "0" : ""}${min}:${padSec ? "0" : ""}${sec}`;
  };

  return (
    <Box>
      <WhiteClock>{convertToMinute(clock[0])}</WhiteClock>
      <BlackClock>{convertToMinute(clock[1])}</BlackClock>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommonClock = styled.div`
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.5px;
`;

const BlackClock = styled(CommonClock)`
  color: white;
  background: rgb(85, 83, 82);
`;

const WhiteClock = styled(CommonClock)`
  color: black;
  background: rgb(248, 248, 248);
`;

export default Clock;
