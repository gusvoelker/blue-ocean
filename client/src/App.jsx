import React, { useState, useEffect, useContext } from 'react'
import { redirect } from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials = true;

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

import UserInfo from './components/LoginSignup/User/UserInfo.jsx'
import SignUp from './components/LoginSignup/SignUp.jsx'
import Login from './components/LoginSignup/Login.jsx'
import TeacherInfo from './components/LoginSignup/Teacher/TeacherInfo.jsx'
import About from './components/LoginSignup/About.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoChat from './components/VideoChat.jsx'
import ThemeToggleButton from './components/NavBar/DarkModeToggle.jsx'
import { SocketContext } from './components/VideoComponents/SocketContext.jsx';



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
  // Teacher language levels
  const [formData, setFormData] = useState({})
  const [checked, setChecked] = useState([]);
  const [isTeacher, setIsTeacher] = useState(JSON.parse(localStorage.getItem('isTeacher')) || false); // TODO: Redirect to login / register page if undefined
  const [languages, setLanguages] = useState([]);

  const { setUser } = useContext(SocketContext);

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
  };

  const getLanguages = () => {
    return axios.get(`${serverURL}/languages`)
      .then(res => setLanguages(res.data))
      .catch(error => {
        return error;
      });
  };

  const getAccount = () => {
    axios.get(`${serverURL}/accounts/id`)
      .then((result) => {
        let user = {
          id: result.data.account_id
        }
        // SET CONTEXT
        setUser(user);
      })
      .catch((error) => console.log(error));
  }

  useState(() => {
    getAccount();
  }, []);

  return (
    <div>
      {darkTheme ? <DarkTheme/> : <LightTheme/>}
      <ThemeToggleButton setDarkTheme={setDarkTheme} darkTheme={darkTheme}/>
      <StyledLogPage>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <>
              <AboutNavBar isTeacher={isTeacher} darkTheme={darkTheme}/>
              <About/>
              </>
            }/>
            <Route path="/SignUp" element={
              <>
              <AboutNavBar isTeacher={isTeacher} darkTheme={darkTheme}/>
              <SignUp
                getAccount={getAccount}
                getLanguages={getLanguages}
              />
              </>
            }/>
            <Route path="/Login" element={
              <>
              <AboutNavBar isTeacher={isTeacher} darkTheme={darkTheme}/>
              <Login
                getAccount={getAccount}
                getLanguages={getLanguages}
              />
              </>
            }/>
            <Route path="/teacherInfo" element={
              <>
              <AboutNavBar isTeacher={isTeacher} darkTheme={darkTheme}/>
              <TeacherInfo
                handleCheck={handleCheck}
                handleChange={handleChange}
                languages={languages}
              />
              </>
            }/>
            <Route path="/userInfo" element={
              <>
              <AboutNavBar isTeacher={isTeacher} darkTheme={darkTheme}/>
              <UserInfo
                handleCheck={handleCheck}
                handleChange={handleChange}
                languages={languages}
              />
              </>
            }/>
            <Route path="/profile" element={
              <>
              <NavBar isTeacher={isTeacher} darkTheme={darkTheme}/>
              <Profile
                darkTheme={darkTheme}
                languages={languages}
              />
              </>
            }/>
            <Route path="/teacherprofile" element={
              <>
              <NavBar isTeacher={isTeacher} darkTheme={darkTheme}/>
              <TeacherProfile
                darkTheme={darkTheme}
                languages={languages}
              />
              </>
            }/>
            <Route path="/messages" element={<><NavBar isTeacher={isTeacher} darkTheme={darkTheme}/><Messages /></>}/>
            <Route path="/videoplayer" element={
              <>
              <NavBar isTeacher={isTeacher} darkTheme={darkTheme} />
              <VideoChat darkTheme={darkTheme} />
              </>
            }/>
          </Routes>
        </BrowserRouter>
      </StyledLogPage>
    </div>
  );
}

