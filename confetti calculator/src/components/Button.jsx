import React from 'react';
import styled from 'styled-components';

// Styled component for the button
const ButtonWrapper = styled.button`
  background-color: rgb(85 85 85); /* Default button background color */
  border: none;
  color: #fff; /* Button text color */
  flex: 1 0 21%; /* Flexbox properties for button layout */
  margin: 0.5px;
  padding: 28px; /* Button padding */
  font-size: 1.3em; /* Button text size */
  border-radius: 0px;
  cursor: pointer; /* Cursor style on hover */
  text-align: center; /* Center align text */

  &.operator {
    background-color: #f39c12; /* Operator button background color */
  }

  &.zero {
    flex: 2 0 46%; /* Zero button spans two columns */
  }

  &:active {
    background-color: #777; /* Background color when button is active */
  }
`;

// Button component
const Button = ({ className, label, onClick }) => (
  <ButtonWrapper className={`button ${className}`} onClick={onClick}>
    {label}
  </ButtonWrapper>
);

export default Button;
