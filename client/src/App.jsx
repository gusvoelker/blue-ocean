import React, { useState } from 'react'
import axios from 'axios';

import { serverURL } from './config.example.js';
import NavBar from './components/NavBar/NavBar.jsx';
import Profile from './components/Profile.jsx';
import TeacherProfile from './components/TeacherProfile.jsx';
import Error from './components/LoginSignup/Error.jsx';
import Messages from './components/Messages.jsx';
import { StyledLogPage, LightTheme, DarkTheme } from './components/StyledComponents/StyledComponents.jsx'
import EntryForm from './components/LoginSignup/EntryForm.jsx';
import Role from './components/LoginSignup/Role.jsx'
import UserSignUp from './components/LoginSignup/User/UserSignUp.jsx';
import UserLogin from './components/LoginSignup/User/UserLogin.jsx'
import UserInfo from './components/LoginSignup/User/UserInfo.jsx'
import TeacherSignUp from './components/LoginSignup/Teacher/TeacherSignUp.jsx'
import TeacherLogin from './components/LoginSignup/Teacher/TeacherLogin.jsx'
import TeacherInfo from './components/LoginSignup/Teacher/TeacherInfo.jsx'
import About from './components/LoginSignup/About.jsx'

export default function App () {
  const [darkTheme, setDarkTheme] = useState(true);
  return (
    <div>
      <StyledLogPage>
        <NavBar/>
        <TeacherProfile/>
      </StyledLogPage>
    </div>
  );
}

