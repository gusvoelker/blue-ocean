import React, { useState, useEffect } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;
import {serverURL} from '../../config.js';
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
} from '../StyledComponents/StyledComponents.jsx'

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${serverURL}/register`, {
        email,
        password,
        firstName,
        lastName,
        isTeacher
      })
      localStorage.setItem('isTeacher', res.data.user.isTeacher);
      await props.getLanguages();
      navigate(JSON.parse(localStorage.getItem('isTeacher')) ? '/teacherinfo' : '/userinfo')
    } catch (err) {
      console.log(err.response.data)
      setErrorMessage(err.response.data)
      setError(true);
    }
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
             <StyledTextInput placeholder='Enter first name' name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            </StyledLabel>
            <StyledLabel>
              Last name:
              <StyledTextInput placeholder='Enter last name' name='last' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </StyledLabel>
            <StyledLabel>
              <span>
                Email:
              </span>
              <StyledTextEmail placeholder='Enter email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </StyledLabel>
            <StyledLabel>
              <span>
                Password:
              </span>
              <StyledTextInput placeholder='Enter password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </StyledLabel>
            <StyledLabel>
              Role:
              <StyledSelectInput onChange={(e) => setIsTeacher(Boolean(e.target.value))} style={{height: '2rem', fontSize: '0.8rem'}}>
                <option value={false}>Student</option>
                <option value={true}>Teacher</option>
              </StyledSelectInput>
            </StyledLabel>
          </StyledRightAlignedForms>
          {error ? <p>
            {errorMessage}
          </p> : null}
          <StyledSubmitInput value='SUBMIT' onClick={handleSubmit}></StyledSubmitInput>
        </StyledLoginSignUpForm>
      </StyledloginSignUpBox>
  )
}