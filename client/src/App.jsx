import React, { useState } from 'react'
import axios from 'axios';

import { serverURL } from './config.example.js';
import NavBar from './components/NavBar/NavBar.jsx';
import Profile from './components/Profile.jsx';
import TeacherProfile from './components/TeacherProfile.jsx';
import Error from './components/LoginSignup/Error.jsx';
import Messages from './components/Messages.jsx';
import { StyledLogPage, LightTheme, DarkTheme } from './components/StyledComponents/StyledComponents.jsx'
import FriendsModal from './components/FriendsModal.jsx';
import EntryForm from './components/LoginSignup/EntryForm.jsx';
import Role from './components/LoginSignup/Role.jsx'
import UserSignUp from './components/LoginSignup/User/UserSignUp.jsx';
import UserLogin from './components/LoginSignup/User/UserLogin.jsx'
import UserInfo from './components/LoginSignup/User/UserInfo.jsx'
import SignUp from './components/LoginSignup/Teacher/SignUp.jsx'
import Login from './components/LoginSignup/Teacher/Login.jsx'
import TeacherInfo from './components/LoginSignup/Teacher/TeacherInfo.jsx'
import About from './components/LoginSignup/About.jsx'
import VideoChat from './components/VideoChat.jsx'



// order:
  // About
  // Role,
  // EntryForm
  // TeacherSignUp
  // TeacherLogin
  // TeacherInfo
  // Profile
  // Messages


export default function App () {
  const [darkTheme, setDarkTheme] = useState(true);
  return (
    <div>
      <LightTheme/>
      <StyledLogPage>
        <NavBar/>
        <TeacherInfo />
      </StyledLogPage>
    </div>
  );
}

