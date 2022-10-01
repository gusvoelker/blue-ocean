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
} from '../StyledComponents/StyledComponents.jsx'

export default function Error () {
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
    <StyledPageRow style={{paddingTop: '12rem', paddingBottom: '10rem'}}>
    <StyledloginSignUpBox style={{height: '27rem', marginTop: '-12rem', zIndex: '2'}}>
      <StyledLoginSignUpForm>
        <h1 style={{textAlign: 'center'}}>
          Looks Like something <br></br>went wrong.
        </h1>
        <h2>
          *error here*
        </h2>
        <StyledSubmitInput value='GO BACK'></StyledSubmitInput>
      </StyledLoginSignUpForm>
    </StyledloginSignUpBox>
    <StyledImage style={{marginBottom: '-6rem', marginLeft: '-6rem', zIndex: '0'}} src="https://images.unsplash.com/photo-1545251142-f32339076e6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
    </StyledPageRow>
  )
}