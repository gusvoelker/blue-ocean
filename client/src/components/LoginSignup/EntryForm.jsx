import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  StyledButton,
  StyledLogPage,
  StyledloginSignUpBox,
  StyledLoginSignUpForm,
  StyledLabel
} from '../StyledComponents/StyledComponents.jsx'

const StyledSideBySideButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 2rem;
`

export default function EntryForm () {
  return (
    <StyledloginSignUpBox>
      <StyledLoginSignUpForm>
        <h1>
          LOG IN OR SIGN UP
        </h1>
        <StyledSideBySideButtons>
          <StyledButton>LOG IN</StyledButton>
          <StyledButton>SIGN UP</StyledButton>
        </StyledSideBySideButtons>

      </StyledLoginSignUpForm>
    </StyledloginSignUpBox>
  )
}