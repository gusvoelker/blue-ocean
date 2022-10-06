import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  StyledButton,
  StyledLogPage,
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

const StyledloginSignUpBox = styled.div`
  background-image: url("https://images.unsplash.com/photo-1599946347371-68eb71b16afc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 35rem;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #383838;
  border: 2px solid #383838;
`

export default function EntryForm () {
  return (
    <StyledloginSignUpBox style={{marginTop: '-12rem'}}>
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