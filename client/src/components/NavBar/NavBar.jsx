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
import { SocketContext } from '../VideoComponents/SocketContext.jsx';

export default function NavBar({ darkTheme, isTeacher }) {

  const renderButton = (
    <Link to={isTeacher ? "/teacherprofile" : "/profile"} style={{textDecoration: 'none'}}>
      <p style={{marginTop: '3rem'}}>Profile</p>
    </Link>
  );

  const renderContent = (
    <>
    <StyledNavBarIcon>
    Chat Chat
    </StyledNavBarIcon>
    <StyledNavBarLinks>
      <p id='translate2' ></p>
      {renderButton}
      <Link to="/messages" style={{textDecoration: 'none'}}>
        <p style={{marginTop: '3rem'}}>Chat</p>
      </Link>
      {isTeacher ? <Link to='/videoplayer' style={{textDecoration: 'none'}}>
        <p style={{marginTop: '3rem'}}>Video Call</p>
      </Link> : null }
    </StyledNavBarLinks>
    </>
  );

  if (darkTheme) {
    return (
      <DarkStyledNavBar id='translate'>
        {renderContent}
      </DarkStyledNavBar>
    );
  }

  return (
    <StyledNavBar id='translate'>
      {renderContent}
    </StyledNavBar>
  );
}
