import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { serverURL } from '../../config.js';
import {
  StyledAbout,
  StyledLoginSignUpForm,
  StyledLabel,
  StyledSelectInput,
  StyledloginSignUpBox,
  StyledPageColumn,
  StyledSubmitInput,
  StyledImage
} from '../StyledComponents/StyledComponents.jsx';


const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: end;
  text-align: right;
  width: 20rem;
  background-color: #38698fda;
  color: #f5f5f5;
  padding: 1rem;
  border-radius: 20px;
  border: 1px solid #f5f5f5;
  p {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: end;
    color: #f5f5f5
  }
`

import { Outlet, Link } from "react-router-dom";

export default function About () {
  const [formData, setFormData] = useState()

  const handleChange = (e) => {
    e.preventDefault();
    setFormData(e.target.value);
    console.log(formData);
  }

  return (
    <StyledPageColumn style={{paddingTop: '6rem'}}>
      <StyledAbout>
        <StyledImage style={{marginRight: '-8rem', marginBottom: '-4rem'}}src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" alt="people talking" />
        <StyledInfo style={{marginTop: '-3rem'}}>
          <h1>
          Philosophy
          </h1>
          <p>

          The ability to communicate with others is central to human nature. Throughout the ages, humans
          have been able to share information, interests, needs, and values over time and space and, thus, have
          influenced others by their actions and their words. In recent years, technology tools have brought the
          world closer and have erased many of the existing borders. As boundaries between countries are
          dissolving, the need for learning world languages has become a necessary component for linking with
          the rest of the world and for producing an enlightened citizenship able to function in today’s global
          marketplace.
          </p>
        </StyledInfo>
      </StyledAbout>
      <StyledLoginSignUpForm style={{width: '20rem', backgroundColor: '#38698fda', height: '12rem', marginLeft: '-30rem', marginTop: '-4rem'}}>
        <h1 style={{marginBottom: '0rem'}}>
          Get Started!
        </h1>
        <Link to="/login">
          <StyledSubmitInput value='LOG IN' style={{marginTop: '-1rem'}}></StyledSubmitInput>
        </Link>
        <Link to="/signup">
          <StyledSubmitInput value='SIGN UP' style={{marginTop: '-1rem'}}></StyledSubmitInput>
        </Link>
      </StyledLoginSignUpForm>
    </StyledPageColumn>
  )
}