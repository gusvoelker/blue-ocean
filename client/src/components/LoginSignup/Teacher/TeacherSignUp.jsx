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
  StyledSubmitInput,
  StyledPageRow,
  StyledImage
} from '../../StyledComponents/StyledComponents.jsx'

export default function TeacherSignUp () {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first: '',
    last: '',
  })
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log(e.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    console.log('you clicked on a thing');
  }

  return (
    <StyledPageRow style={{paddingTop: '6rem', paddingBottom: '6rem'}}>
      <StyledImage style={{marginTop: '-4rem', marginRight: '-8rem'}} src="https://images.unsplash.com/photo-1516545595035-b494dd0161e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
      <StyledloginSignUpBox style={{height: '27rem', marginBottom: '-4rem'}}>
        <StyledLoginSignUpForm>
          <h1>
            TEACHER SIGN UP
          </h1>
          <StyledRightAlignedForms>
          <StyledLabel>
              First name:
              <StyledTextInput placeholder='enter first name here' name='first' onChange={handleChange}></StyledTextInput>
            </StyledLabel>
            <StyledLabel>
              Last name:
              <StyledTextInput placeholder='enter last name here' name='last' onChange={handleChange}></StyledTextInput>
            </StyledLabel>
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
    </StyledPageRow>
  )
}