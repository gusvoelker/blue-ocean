// THIS SHOULDN'T BE USED! THIS HAS BEEN STREAMLINED TO THE LOGIN IN THE TEACHER FOLDER

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
  background-image: url("https://images.unsplash.com/photo-1546436836-07a91091f160?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80");
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

export default function UserSignUp () {
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
      <StyledloginSignUpBox>
        <StyledLoginSignUpForm>
          <h1>
            USER SIGN UP
          </h1>
          <StyledRightAlignedForms>
            <StyledLabel>
              Email:
              <StyledTextEmail placeholder='enter email' name='email' onChange={handleChange}></StyledTextEmail>
            </StyledLabel>
            <StyledLabel>
              Password:
              <StyledTextInput placeholder='enter password' name='password' onChange={handleChange}></StyledTextInput>
            </StyledLabel>
          </StyledRightAlignedForms>
            <StyledSubmitInput value='SUBMIT'></StyledSubmitInput>
        </StyledLoginSignUpForm>
      </StyledloginSignUpBox>
  )
}