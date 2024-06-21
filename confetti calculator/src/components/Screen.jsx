import React from 'react';
import styled from 'styled-components';

// Styled component for the display
const DisplayWrapper = styled.div`
  background-color: rgb(65 65 65); /* Display background color */
  color: #fff; /* Display text color */
  font-size: 4rem; /* Adjust font size as needed */
  text-align: right; /* Align text to the right */
  padding: 0 10px; /* Display padding */
  height: 100px; /* Adjust height as needed */
  width: 100%; /* Full width display */
  display: flex; /* Flexbox layout */
  align-items: center; /* Vertically center content */
  justify-content: flex-end; /* Horizontally align content to the right */
  box-sizing: border-box; /* Include padding in element's total width and height */
  overflow: hidden; /* Hide overflow content */
  white-space: nowrap; /* Prevent text wrapping */
  border: 2px solid #444; /* Border for a defined display area */
  border-radius: 10px; /* Rounded corners */
`;

// Display component
const Display = ({ value }) => (
  <DisplayWrapper>
    {value}
  </DisplayWrapper>
);

export default Display;
