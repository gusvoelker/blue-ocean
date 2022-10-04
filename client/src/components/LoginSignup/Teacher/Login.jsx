import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import axios from 'axios';
import {serverURL} from '../../../../src/config.js';
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
} from '../../StyledComponents/StyledComponents.jsx';
import { SocketContext } from '../../VideoComponents/SocketContext.jsx';

import { Outlet, Link, useNavigate } from "react-router-dom";

const StyledloginSignUpBox = styled.div`
  background-image: url("https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80");
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

export default function Login (props) {
  // const {userId, setUserId} = useContext(SocketContext);
  const navigate = useNavigate();

  let formData = {
    email: props.email,
    password: props.password
  }

  const handleSubmitStudent = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${serverURL}/login`, formData);
      console.log(res)
      props.onIdChange(res.data.user.id)
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmitTeacher = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${serverURL}/login`, formData);
      console.log(res)
      navigate("/teacherprofile")
    } catch (err) {
      console.log(err);
    }
  }

  let button;

  if (props.role === 'user') {
    button = <Link to="/profile">
                <StyledSubmitInput value='SUBMIT' onClick={handleSubmitStudent}></StyledSubmitInput>
            </Link>
  } else {
    button = <Link to="/teacherprofile">
                <StyledSubmitInput value='SUBMIT' onClick={handleSubmitTeacher}></StyledSubmitInput>
            </Link>
  }

  return (
      <StyledloginSignUpBox style={{height: '30rem', zIndex: '1', marginTop: '-2rem'}}>
        <StyledLoginSignUpForm onSubmit={handleSubmit}>
          <h1>
            LOG IN
          </h1>
          <StyledRightAlignedForms>
            <StyledLabel>
              Email:
              <StyledTextEmail placeholder='enter email here' name='email' onChange={props.onEmailChange}></StyledTextEmail>
            </StyledLabel>
            <StyledLabel>
              Password:
              <StyledTextInput placeholder='enter password here' name='password' onChange={props.onPasswordChange}></StyledTextInput>
            </StyledLabel>
            <StyledLabel>
            teacher or student:
            <StyledSelectInput value={props.role} onChange={props.onRoleChange} style={{height: '2rem', fontSize: '0.8rem'}}>
              <option value='teacher'>Teacher</option>
              <option value='user'>Student</option>
            </StyledSelectInput>
            </StyledLabel>
          </StyledRightAlignedForms>
          <StyledSubmitInput value='SUBMIT'></StyledSubmitInput>
        </StyledLoginSignUpForm>
      </StyledloginSignUpBox>
  )
}