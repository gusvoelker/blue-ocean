import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  StyledNavBar,
  StyledNavBarIcon,
  StyledNavBarLinks
} from '../StyledComponents/StyledComponents.jsx'

export default function NavBar () {
  return (
    <StyledNavBar>
      <StyledNavBarIcon>
        Rosettasto Né
      </StyledNavBarIcon>
      <StyledNavBarLinks>
        <p>Language</p>
        <p>Profile</p>
      </StyledNavBarLinks>
    </StyledNavBar>
  )
}