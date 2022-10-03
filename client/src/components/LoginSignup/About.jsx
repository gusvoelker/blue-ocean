import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  StyledAbout,
  StyledLoginSignUpForm,
  StyledLabel,
  StyledSelectInput,
  StyledloginSignUpBox,
  StyledPageColumn,
  StyledSubmitInput,
  StyledImage
} from '../StyledComponents/StyledComponents.jsx'


const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: end;
  text-align: right;
  width: 20rem;
  background-color: #38698fda;
  color: #f5f5f5;
  padding: 1rem;
  border-radius: 20px;
  border: 1px solid #f5f5f5;
  p {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: end;
    color: #f5f5f5
  }
`


export default function About () {
  const [formData, setFormData] = useState()

  const handleChange = (e) => {
    e.preventDefault();
    setFormData(e.target.value);
    console.log(formData);
  }
  return (
    <StyledPageColumn style={{paddingTop: '6rem'}}>
      <StyledAbout>
        <StyledImage style={{marginRight: '-8rem', marginBottom: '-4rem'}}src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" alt="people talking" />
        <StyledInfo style={{marginTop: '-3rem'}}>
          <h1>
            About Us
          </h1>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </StyledInfo>
      </StyledAbout>
      <StyledLoginSignUpForm style={{width: '20rem', backgroundColor: '#38698fda', height: '12rem', marginLeft: '-30rem', marginTop: '-4rem'}}>
        <h1 style={{marginBottom: '0rem'}}>
          Get Started!
        </h1>
        <StyledSubmitInput value='LOG IN' style={{marginTop: '-1rem'}}></StyledSubmitInput>
        <StyledSubmitInput value='SIGN UP' style={{marginTop: '-1rem'}}></StyledSubmitInput>
      </StyledLoginSignUpForm>
    </StyledPageColumn>
  )
}