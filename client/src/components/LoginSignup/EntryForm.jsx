import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  StyledButton,
  StyledLogPage,
  StyledloginSignUpBox,
  StyledLoginSignUpForm,
  StyledLabel,
  StyledPageRow,
  StyledImage
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
    <StyledPageRow>
      <StyledImage style={{marginBottom: '4rem'}} src="https://images.unsplash.com/photo-1599946347371-68eb71b16afc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
    <StyledloginSignUpBox style={{marginTop: '12rem'}}>
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
    </StyledPageRow>
  )
}