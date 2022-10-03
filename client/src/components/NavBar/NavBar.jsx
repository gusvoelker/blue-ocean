import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  StyledNavBar,
  StyledNavBarIcon,
  StyledNavBarLinks,
  StyledSelectInput,
  DarkStyledNavBar,
} from '../StyledComponents/StyledComponents.jsx'
import './googleTranslate.css'

export default function NavBar({ darkTheme }) {
  if(!darkTheme) {
    return (
      <StyledNavBar id='translate'>
        <StyledNavBarIcon>
          Not Rosetta Stone
        </StyledNavBarIcon>

        <StyledNavBarLinks>
          <p id='translate2' ></p>
          <p style={{marginTop: '3rem'}}>Profile</p>
          <p style={{marginTop: '3rem'}}>Chat</p>
        </StyledNavBarLinks>


      </StyledNavBar>
    )
  } else {
    return (
      <DarkStyledNavBar id='translate'>
        <StyledNavBarIcon>
          Not Rosetta Stone
        </StyledNavBarIcon>

        <StyledNavBarLinks>
          <p id='translate2' ></p>
          <p style={{marginTop: '3rem'}}>Profile</p>
          <p style={{marginTop: '3rem'}}>Chat</p>
        </StyledNavBarLinks>


      </DarkStyledNavBar>
    )
  }
}