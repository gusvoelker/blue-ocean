import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { StyledLogPage,
  ThemeToggle,
  OuterToggle,
  InnerToggle,
} from '../StyledComponents/StyledComponents.jsx'

export default function ThemeToggleButton ({ setDarkTheme, darkTheme }) {
  const handleThemeToggle = (e) => {
    e.preventDefault();
    setDarkTheme(!darkTheme);
  }
  if (!darkTheme) {
    return (
      <ThemeToggle onClick={handleThemeToggle} style={{backgroundColor: '#386A8F', boxShadow: '0px 5px 5px #383838'}}>
        Change Theme
        <OuterToggle><InnerToggle></InnerToggle></OuterToggle>
      </ThemeToggle>
    )
  } else {
    return (
      <ThemeToggle onClick={handleThemeToggle}>
        <span>
          Change Theme:
        </span>
        <OuterToggle><InnerToggle style={{float: 'right', backgroundColor: '#386A8F'}}></InnerToggle></OuterToggle>
      </ThemeToggle>
    )
  }
}