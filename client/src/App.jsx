import React from 'react'
import axios from 'axios';

import { serverURL } from './config.example.js';
import NavBar from './components/NavBar/NavBar.jsx';
import { StyledLogPage } from './components/StyledComponents/StyledComponents.jsx'
import EntryForm from './components/LoginSignup/EntryForm.jsx';
import Role from './components/LoginSignup/Role.jsx'
import UserSignUp from './components/LoginSignup/User/UserSignUp.jsx';
import UserLogin from './components/LoginSignup/User/UserLogin.jsx'
import UserInfo from './components/LoginSignup/User/UserInfo.jsx'
import TeacherSignUp from './components/LoginSignup/Teacher/TeacherSignUp.jsx'
import TeacherLogin from './components/LoginSignup/Teacher/TeacherLogin.jsx'
import TeacherInfo from './components/LoginSignup/Teacher/TeacherInfo.jsx'


// order of log in role, entryform, login/signup, info

export default function App () {
  return (
    <StyledLogPage>
      <NavBar/>
      <TeacherSignUp/>
    </StyledLogPage>
  );
}

