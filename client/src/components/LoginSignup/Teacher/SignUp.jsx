import React, { useState, useEffect } from "react";
import axios from 'axios';
import {serverURL} from '../../../config.js';
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
  StyledImage,
  StyledSelectInput
} from '../../StyledComponents/StyledComponents.jsx'

import { Outlet, Link } from "react-router-dom";

const StyledloginSignUpBox = styled.div`
  background-image: url("https://images.unsplash.com/photo-1516545595035-b494dd0161e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 35rem;
  height: 35rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #383838;
  border: 2px solid #383838;
`

export default function SignUp (props) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('error')
  const [isTeacher, setTeacher] = useState(true);
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log(e.target.value);
  }


  const handleSelect = (e) => {
    e.preventDefault();
    if (e.target.value === 'teacher') {
      setTeacher(true);
    } else {
      setTeacher(false);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    setError(false);
    const res = await axios.post(`${serverURL}/register`, {...formData, isTeacher: isTeacher})
    console.log(res)
    } catch (err) {
      setErrorMessage(err.response.data.message)
      setError(true);
      console.log(err);
    }

  }

  let button;

  if (props.role === 'user') {
    button = <Link to="/profile">
                <StyledSubmitInput value='SUBMIT' onClick={handleSubmit}></StyledSubmitInput>
              </Link>
  } else {
    button = <Link to="/teacherinfo">
                <StyledSubmitInput value='SUBMIT' onClick={handleSubmit}></StyledSubmitInput>
              </Link>
  }

  return (
      <StyledloginSignUpBox>
        <StyledLoginSignUpForm>
          <h1 style={{marginBottom: '-1rem'}}>
            SIGN UP
          </h1>
          <StyledRightAlignedForms>
          <StyledLabel>
              First name:

             <StyledTextInput placeholder='enter first name' name='firstName' onChange={handleChange}></StyledTextInput>
            </StyledLabel>
            <StyledLabel>
              Last name:
              <StyledTextInput placeholder='enter last name' name='lastName' onChange={handleChange}></StyledTextInput>

             {/* <StyledTextInput placeholder='enter first name' name='firstName' onChange={handleChange}></StyledTextInput>
            </StyledLabel>
            <StyledLabel>
              Last name:
              <StyledTextInput placeholder='enter last name' name='lastName' onChange={handleChange}></StyledTextInput> */}

            </StyledLabel>
            <StyledLabel>
              <span>
                Email:
              </span>
              <StyledTextEmail placeholder='enter email' name='email' onChange={handleChange}></StyledTextEmail>
            </StyledLabel>
            <StyledLabel>
              <span>
                Password:
              </span>
              <StyledTextInput placeholder='enter password' name='password' onChange={handleChange}></StyledTextInput>
            </StyledLabel>
            <StyledLabel>
            teacher or student:

            <StyledSelectInput onChange={handleSelect} style={{height: '2rem', fontSize: '0.8rem'}}>

            {/* <StyledSelectInput onChange={handleSelect} style={{height: '2rem', fontSize: '0.8rem'}}> */}

              <option value='teacher'>Teacher</option>
              <option value='user'>Student</option>
            </StyledSelectInput>
            </StyledLabel>
          </StyledRightAlignedForms>
          {error ? <p>
            {errorMessage}
          </p> : null}
          {button}
        </StyledLoginSignUpForm>
      </StyledloginSignUpBox>
  )
}