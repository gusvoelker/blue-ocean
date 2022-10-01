import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  StyledButton,
  StyledLogPage,
  StyledloginSignUpBox,
  StyledLoginSignUpForm,
  StyledLabel,
  StyledTextEmail,
  StyledTextInput,
  StyledRightAlignedForms,
  StyledSubmitInput
} from '../../StyledComponents/StyledComponents.jsx'

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
    <StyledloginSignUpBox style={{height: '27rem'}}>
      <StyledLoginSignUpForm>
        <h1>
          USER SIGN UP
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