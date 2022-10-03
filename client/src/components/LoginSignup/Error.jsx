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
} from '../StyledComponents/StyledComponents.jsx'

const StyledloginSignUpBox = styled.div`
  background-image: url("https://images.unsplash.com/photo-1545251142-f32339076e6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 35rem;
  height: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #383838;
  border: 2px solid #383838;
`

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
    <StyledloginSignUpBox style={{height: '30rem', marginTop: '-10rem', zIndex: '2'}}>
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
  )
}