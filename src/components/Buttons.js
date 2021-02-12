import React from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Buttons({ handleBack, handleNext }) {
  return (
    <Box>
      <Button onClick={handleBack}>
        <FaChevronLeft />
      </Button>
      <Button onClick={handleNext}>
        <FaChevronRight />
      </Button>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
`;

const Button = styled.button`
  all: unset;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
`;

export default Buttons;
