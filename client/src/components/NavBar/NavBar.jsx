import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  StyledNavBar,
  StyledNavBarIcon,
  StyledNavBarLinks,
  StyledSelectInput
} from '../StyledComponents/StyledComponents.jsx'
import './googleTranslate.css'

export default function NavBar() {


  return (
    <StyledNavBar id='translate'>
      <StyledNavBarIcon>
        Rosettasto Né
      </StyledNavBarIcon>

      <div id='translate2' ></div>
      <StyledNavBarLinks>
        <p>Profile</p>
        <p>Chat</p>
      </StyledNavBarLinks>


    </StyledNavBar>
  )
}