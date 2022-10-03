import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  StyledButton,
  StyledLogPage,
  StyledLoginSignUpForm,
  StyledLabel,
  StyledTextEmail,
  StyledTextInput,
  StyledRightAlignedForms,
  StyledSubmitInput,
  StyledPageRow,
  StyledImage
} from '../../StyledComponents/StyledComponents.jsx'

const StyledloginSignUpBox = styled.div`
  background-image: url("https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80");
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

export default function UserLogin () {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log(e.target.value);
  }

  return (
    <StyledloginSignUpBox style={{height: '27rem', marginTop: '-12rem', zIndex: '2'}}>
      <StyledLoginSignUpForm>
        <h1>
          USER LOGIN
        </h1>
        <StyledRightAlignedForms>
          <StyledLabel>
            Email:
            <StyledTextEmail placeholder='enter email here' name='email' onChange={handleChange}></StyledTextEmail>
          </StyledLabel>
          <StyledLabel>
            Password:
            <StyledTextInput placeholder='enter password here' name='password' onChange={handleChange}></StyledTextInput>
          </StyledLabel>
        </StyledRightAlignedForms>
          <StyledSubmitInput value='SUBMIT'></StyledSubmitInput>
      </StyledLoginSignUpForm>
    </StyledloginSignUpBox>
  )
}