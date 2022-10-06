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
      <ThemeToggle onClick={handleThemeToggle}>
        <img src='https://cdn.iconscout.com/icon/free/png-256/moon-1522720-1289406.png'/>
      </ThemeToggle>
    )
  } else {
    return (
      <ThemeToggle onClick={handleThemeToggle}>
        {/* <span>
          Change Theme:
        </span>
        <OuterToggle><InnerToggle style={{float: 'right', backgroundColor: '#386A8F'}}></InnerToggle></OuterToggle> */}
        <img src='https://www.nicepng.com/png/full/121-1215503_sun-icon-white-sun-blue-background.png'/>
      </ThemeToggle>
    )
  }
}