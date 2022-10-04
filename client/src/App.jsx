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
import { BrowserRouter, Routes, Route } from "react-router-dom";


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
  const [email, setEmail] = useState('hello@gmail.com');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('teacher');
  const [firstName, setFirstName] = useState('Anthony');
  const [lastName, setLastName] = useState('Liang');
  const [formData, setFormData] = useState({
    level: '',
  })
  const [checked, setChecked] = useState([]);
  const [friends, setFriends] = useState(['Adam', 'Bob', 'Charlie', 'Daniel', 'Emily', 'Florenza', 'Emily', 'Florenza']);
  const [profilePicture, setProfilePicture] = useState('https://i.postimg.cc/gkDMWvVY/photo-1615497001839-b0a0eac3274c.jpg');

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log(e.target.value);
  }

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    console.log(checked);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const onRoleChange = (e) => {
    setRole(e.target.value);
  }

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  return (
    <div>
      <StyledLogPage>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <>
                <NavBar role={role}/>
                  <About/>
              </>
            }>
            </Route>
            <Route path="/SignUp" element={
              <>
                <NavBar role={role}/>
                <SignUp
                  onFirstNameChange={onFirstNameChange}
                  onLastNameChange={onLastNameChange}
                  onRoleChange={onRoleChange}
                  onEmailChange={onEmailChange}
                  onPasswordChange={onPasswordChange}
                  role={role}
                />
              </>
            }>
            </Route>
            <Route path="/Login" element={
              <>
                <NavBar role={role}/>
                  <Login
                    onEmailChange={onEmailChange}
                    onPasswordChange={onPasswordChange}
                    onRoleChange={onRoleChange}
                    role={role}
                  />
                </>
              }>
            </Route>
            <Route path="/teacherInfo" element={
              <>
                <NavBar role={role}/>
                <TeacherInfo
                  handleCheck={handleCheck}
                  handleChange={handleChange}
                />
              </>
            }>
            </Route>
            <Route path="/profile" element={<>
              <NavBar role={role}/>
              <Profile
                friends={friends}
                profilePicture={profilePicture}
                firstName={firstName}
                lastName={lastName}
                email={email}
                password={password}
                role={role}
              />
            </>} >
            </Route>
            <Route path="/teacherprofile" element={<>
              <NavBar role={role}/>
              <TeacherProfile
                friends={friends}
                profilePicture={profilePicture}
                firstName={firstName}
                lastName={lastName}
                email={email}
                password={password}
                role={role}
              />
            </>} >
            </Route>
            <Route path="/messages" element={<><NavBar/><Messages /></>} ></Route>
          </Routes>
        </BrowserRouter>
      </StyledLogPage>
    </div>
  );
}

