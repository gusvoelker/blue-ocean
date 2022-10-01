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
    <StyledPageRow style={{paddingTop: '6rem', paddingBottom: '6rem'}}>
      <StyledImage style={{marginTop: '-4rem', marginRight: '-8rem'}} src="https://images.unsplash.com/photo-1546436836-07a91091f160?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80"/>
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
    </StyledPageRow>
  )
}