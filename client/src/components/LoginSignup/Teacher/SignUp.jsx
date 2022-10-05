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

import { Outlet, Link, useNavigate } from "react-router-dom";

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
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  let formData = {
    email: props.email,
    password: props.password,
    firstName: props.firstName,
    lastName: props.lastName,
    isTeacher: props.isTeacher
  }

  const handleClickStudent = async(e) => {
    e.preventDefault();
    try{
    const res = await axios.post(`${serverURL}/register`, formData)
    console.log(res)
    //props.onIdChange(res.data.user.id)
    navigate('/userinfo')
    } catch (err) {
      console.log(err.response.data)
      setErrorMessage(err.response.data)
      setError(true);
    }
  }

  const handleClickTeacher = async(e) => {
    e.preventDefault();
    try{
    const res = await axios.post(`${serverURL}/register`, formData)
    console.log('res: ', res)
    //props.onIdChange(res.data.user.id)
    navigate('/teacherinfo')
    } catch (err) {
      console.log(err.response.data)
      setErrorMessage(err.response.data)
      setError(true);
    }
  }

  let button;

  if (props.role === 'user') {
    button = <Link to="/userinfo">
              <StyledSubmitInput value='SUBMIT' onClick={handleClickStudent}></StyledSubmitInput>
            </Link>
  } else {
    button = <Link to="/teacherinfo">
              <StyledSubmitInput value='SUBMIT' onClick={handleClickTeacher}></StyledSubmitInput>
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

             <StyledTextInput placeholder='enter first name' name='firstName' onChange={props.onFirstNameChange}></StyledTextInput>
            </StyledLabel>
            <StyledLabel>
              Last name:
              <StyledTextInput placeholder='enter last name' name='last' onChange={props.onLastNameChange}></StyledTextInput>
            </StyledLabel>
            <StyledLabel>
              <span>
                Email:
              </span>
              <StyledTextEmail placeholder='enter email' name='email' onChange={props.onEmailChange}></StyledTextEmail>
            </StyledLabel>
            <StyledLabel>
              <span>
                Password:
              </span>
              <StyledTextInput placeholder='enter password' name='password' onChange={props.onPasswordChange}></StyledTextInput>
            </StyledLabel>
            <StyledLabel>
            teacher or student:

            <StyledSelectInput onChange={props.onRoleChange} style={{height: '2rem', fontSize: '0.8rem'}}>

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