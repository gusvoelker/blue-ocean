import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { serverURL } from './config.js';
import NavBar from './components/NavBar/NavBar.jsx';
import AboutNavBar from './components/NavBar/AboutNavBar.jsx';
import Profile from './components/Profile.jsx';
import TeacherProfile from './components/TeacherProfile.jsx';
import Error from './components/LoginSignup/Error.jsx';
import Messages from './components/Messages.jsx';
import { StyledLogPage,
  LightTheme,
  DarkTheme,
  DarkStyledNavBar,
} from './components/StyledComponents/StyledComponents.jsx'
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
import VideoChat from './components/VideoChat.jsx'
import ThemeToggleButton from './components/NavBar/DarkModeToggle.jsx'


// User Story
  // About
  // Login or signup
    // signup
      // Teacher or User
    // login
  // Profile
  // You can get anywhere


export default function App () {
  const [darkTheme, setDarkTheme] = useState(false);
  const [email, setEmail] = useState('hello@gmail.com');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('teacher');
  const [teacherBoolean, setTeacherBoolean] = useState(false)
  const [firstName, setFirstName] = useState('Anthony');
  const [lastName, setLastName] = useState('Liang');
  // Teacher language levels
  const [formData, setFormData] = useState({})
  const [checked, setChecked] = useState([]);
  const [friends, setFriends] = useState([
    {account_id: 4, first_name: 'Bill', last_name: 'from lotr', email: 'galad@gmail.edu', avatar_url: null},
    {account_id: 3, first_name: 'Ted', last_name: 'Baggins', email: 'frodo@gmail.edu', avatar_url: null},
    {account_id: 5, first_name: 'Tom', last_name: 'Buttkiss', email: 'tom@gmail.edu', avatar_url: null}]);
  const [profilePicture, setProfilePicture] = useState('https://i.postimg.cc/gkDMWvVY/photo-1615497001839-b0a0eac3274c.jpg');
  const [languages, setLanguages] = useState([]);
  const [isTeacher, setTeacher] = useState(true);
  const [userId, setUserId] = useState('');

  const onIdChange = (value) => {
    setUserId(value);
  }

  const teacherInfoSubmit = async () => {
    // try {
    //   const res = axios.post('/languages/taught', formData)
    //   console.log(res)
    // } catch (err) {
    //   console.log(err)
    // }
  }

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

  useEffect(() => {
    if (role === 'user') {
      setTeacher(false);
    } else {
      setTeacher(true);
    }
  }, [role])

  return (
    <div>
      {!darkTheme ? <LightTheme/> : <DarkTheme/>}
      <ThemeToggleButton setDarkTheme={setDarkTheme} darkTheme={darkTheme}/>
      <StyledLogPage>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <>
                <AboutNavBar role={role} darkTheme={darkTheme}/>
                  <About/>
              </>
            }>
            </Route>
            <Route path="/SignUp" element={
              <>
                <NavBar role={role} darkTheme={darkTheme}/>
                <SignUp
                  onFirstNameChange={onFirstNameChange}
                  onLastNameChange={onLastNameChange}
                  onRoleChange={onRoleChange}
                  onEmailChange={onEmailChange}
                  onPasswordChange={onPasswordChange}
                  email={email}
                  password={password}
                  firstName={firstName}
                  lastName={lastName}
                  role={role}
                  isTeacher={isTeacher}
                  onIdChange={onIdChange}
                />
              </>
            }>
            </Route>
            <Route path="/Login" element={
              <>
                <NavBar role={role} darkTheme={darkTheme}/>
                  <Login
                    onEmailChange={onEmailChange}
                    onPasswordChange={onPasswordChange}
                    onRoleChange={onRoleChange}
                    email={email}
                    password={password}
                    role={role}
                    onIdChange={onIdChange}
                  />
                </>
              }>
            </Route>
            <Route path="/teacherInfo" element={
              <>
                <NavBar role={role} darkTheme={darkTheme}/>
                <TeacherInfo
                  handleCheck={handleCheck}
                  handleChange={handleChange}
                  languages={languages}
                  setLanguages={setLanguages}
                  formData={formData}
                  teacherInfoSubmit={teacherInfoSubmit}
                />
              </>
            }>
            </Route>
            <Route path="/userInfo" element={
              <>
                <NavBar role={role} darkTheme={darkTheme}/>
                <UserInfo
                  handleCheck={handleCheck}
                  handleChange={handleChange}
                  languages={languages}
                  setLanguages={setLanguages}
                  formData={formData}
                />
              </>
            }>
            </Route>
            <Route path="/profile" element={<>
              <NavBar role={role} darkTheme={darkTheme}/>
              <Profile
                darkTheme={darkTheme}
                friends={friends}
                profilePicture={profilePicture}
                firstName={firstName}
                lastName={lastName}
                email={email}
                password={password}
                role={role}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setEmail={setEmail}
                setLanguages={setLanguages}
                setFriends={setFriends}
                userId={userId}
              />
            </>} >
            </Route>
            <Route path="/teacherprofile" element={<>
              <NavBar role={role} darkTheme={darkTheme}/>
              <TeacherProfile
                darkTheme={darkTheme}
                friends={friends}
                profilePicture={profilePicture}
                firstName={firstName}
                lastName={lastName}
                email={email}
                password={password}
                role={role}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setEmail={setEmail}
                setLanguages={setLanguages}
                setFriends={setFriends}
                userId={userId}
              />
            </>} >
            </Route>
            <Route path="/messages" element={<><NavBar role={role} darkTheme={darkTheme}/><Messages friends={friends} /></>} ></Route>
            <Route path="/videoplayer" element={<>
              <NavBar role={role} darkTheme={darkTheme} />
              <VideoChat darkTheme={darkTheme} />
            </>} >
            </Route>
          </Routes>
        </BrowserRouter>
      </StyledLogPage>
    </div>
  );
}

