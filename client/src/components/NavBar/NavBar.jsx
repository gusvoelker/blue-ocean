import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  StyledNavBar,
  StyledNavBarIcon,
  StyledNavBarLinks,
  StyledSelectInput,
  StyledSubmitInput
} from '../StyledComponents/StyledComponents.jsx'
import './googleTranslate.css'
import { Outlet, Link } from "react-router-dom";

export default function NavBar(props) {

  let button;
  if (props.role === 'user') {
    button = <Link to="/profile">
                <p style={{marginTop: '3rem'}}>Profile</p>
              </Link>
  } else {
    button = <Link to="/teacherprofile">
              <p style={{marginTop: '3rem'}}>Profile</p>
            </Link>
  }


  return (
    <StyledNavBar id='translate'>
      <StyledNavBarIcon>
        Not Rosetta Stone
      </StyledNavBarIcon>

      <StyledNavBarLinks>
        <p id='translate2' ></p>
        {button}
        <Link to="/messages">
          <p style={{marginTop: '3rem'}}>Chat</p>
        </Link>
      </StyledNavBarLinks>


    </StyledNavBar>
  )
}