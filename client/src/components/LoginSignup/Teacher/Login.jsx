import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import axios from 'axios';
axios.defaults.withCredentials = true;
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
  const { setUser} = useContext(SocketContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('hello');
  const navigate = useNavigate();

  let formData = {
    email: props.email,
    password: props.password
  }

  const handleSubmit= async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${serverURL}/login`, formData);
      console.log('logged in');
      console.log(res.data.id)
      props.onIdChange(res.data.id);
      setUser(res.data);
      navigate(res.data.isTeacher ? "/teacherprofile" : "/profile");
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data);
      setError(true);
    }
  };

    // try {
    //   const res = await axios.post(`${serverURL}/login`, formData);
    //   console.log(res)
    //   props.onIdChange(res.data.user.id)
    //   navigate("/profile");
    // } catch (err) {
    //   console.log(err);
    //   setErrorMessage(err.response.data);
    //   setError(true);
    // }

  const handleSubmitTeacher = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${serverURL}/login`, formData);
      console.log(res)
      props.onIdChange(res.data.id);
      setUser(res.data.id);
      navigate("/teacherprofile")
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data);
      setError(true);
    }
  }


  let button =
  <Link to="/profile">
    <StyledSubmitInput value='SUBMIT' onClick={handleSubmit}></StyledSubmitInput>
  </Link>;

  return (
      <StyledloginSignUpBox style={{height: '30rem', zIndex: '1', marginTop: '-2rem'}}>
        <StyledLoginSignUpForm>
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
              <StyledTextInput placeholder='enter password here' name='password' type="password" onChange={props.onPasswordChange}></StyledTextInput>
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