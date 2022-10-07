import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  StyledNavBar,
  StyledNavBarIcon,
  StyledNavBarLinks,
  StyledSelectInput,
  StyledSubmitInput,
  DarkStyledNavBar,
} from '../StyledComponents/StyledComponents.jsx';
import './googleTranslate.css'
import { Outlet, Link } from "react-router-dom";

export default function NavBar({ darkTheme, isTeacher }) {

  let button =
  <Link to={isTeacher ? "/teacherprofile" : "/profile"} style={{textDecoration: 'none'}}>
    <p style={{marginTop: '3rem'}}>Profile</p>
  </Link>;

  if(!darkTheme) {
    return (
      <StyledNavBar id='translate'>
        <StyledNavBarIcon>
          Chat Chat
        </StyledNavBarIcon>

        <StyledNavBarLinks>
          <p id='translate2' ></p>
          {button}
          <Link to="/messages" style={{textDecoration: 'none'}}>
            <p style={{marginTop: '3rem'}}>Chat</p>
          </Link>
        </StyledNavBarLinks>

      </StyledNavBar>
    )
  } else {
    return (
      <DarkStyledNavBar id='translate'>
        <StyledNavBarIcon>
        Chat Chat
        </StyledNavBarIcon>

        <StyledNavBarLinks>
          <p id='translate2' ></p>
          {button}
          <Link to="/messages" style={{textDecoration: 'none'}}>
            <p style={{marginTop: '3rem'}}>Chat</p>
          </Link>
        </StyledNavBarLinks>
      </DarkStyledNavBar>
    )
  }
}