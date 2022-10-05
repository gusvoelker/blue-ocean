import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  ProfileContainer,
  ProfilePicture,
  ProfileBackground,
  ProfileAccountInfo,
  ProfileFriendsList,
  ProfileChatContainer,
  LightGreyButton,
  StyledButton,
  StyledFriend,
  StyledFriendIcons,
  StyledFriendSearchSpan,
  StyledFriendSearch,
  StyledEditProfileButton,
  IconCircleDiv
} from './StyledComponents/StyledComponents.jsx'
import axios from 'axios';
import FormData from 'form-data'
import TeacherClassListModal from './LoginSignup/Teacher/TeacherClassListModal.jsx';
import { faChevronLeft, faChevronRight, faChevronUp, faChevronDown, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FriendsModal from './FriendsModal.jsx';
import AddFriendModal from './AddFriendModal.jsx';
import EditInfoModal from './EditInfoModal.jsx';
import TeacherCalendar from '../components/LoginSignup/Teacher/TeacherCalendar.jsx'
import { serverURL } from '../config.js'
import ClassListModal from '../components/LoginSignup/Teacher/ClassListModal.jsx'
import DateTimePicker from 'react-datetime-picker';
import ScheduleModal from '../components/LoginSignup/Teacher/ScheduleModal.jsx';

const LeftButton = styled.button`
  position: absolute;
  width: 3%;
  top: 0;
  margin-top: 1rem;
  margin-left: 45%;
  height: 10%;
  border: none;
  background-color: #38698fba;
  border: 1px solid #f5f5f5;
  color: #f5f5f5;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 50px;
  z-index: 2;
  &:hover {
    background-color: #383838c8;
    border-radius: 50px;
  }
`
// right button for carousel
const RightButton = styled.button`
  position: absolute;
  top: 0;
  margin-right: 45%;
  right: 1%;
  margin-top: 1rem;
  width: 3%;
  height: 10%;
  background-color: #38698fba;
  color: #f5f5f5;
  transition: 0.5s;
  border-radius: 50px;
  cursor: pointer;
  &:hover {
    background-color: #383838c8;
    border-radius: 50px;
  }
  @media (max-width: 600px) {
      right:30%;
    }
  border: 1px solid #f5f5f5;
`


export default function TeacherProfile(props) {
  const [profileBackground, setProfileBackground] = useState(['https://images.unsplash.com/photo-1470125634816-ede3f51bbb42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1998&q=80', 'https://images.unsplash.com/photo-1552288084-454d4fa5caa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2170&q=80', 'https://images.unsplash.com/photo-1606335270813-52d62bfc5e69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2525&q=80', 'https://images.unsplash.com/photo-1591467847734-12186c3a3f1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2156&q=80', 'https://images.unsplash.com/photo-1603731125936-1c28b35b1659?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1905&q=80', 'https://images.unsplash.com/photo-1590918836821-3c692676add7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80']);
  const [profileBackgroundDark, setProfileBackgroundDark] = useState(['https://images.unsplash.com/photo-1475738198235-4b30fc20cff4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1976&q=80', 'https://images.unsplash.com/photo-1552288084-454d4fa5caa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2170&q=80', 'https://images.unsplash.com/photo-1504069424204-a54566b5165c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1984&q=80', 'https://images.unsplash.com/photo-1529984489975-079884dc3bc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2320&q=80', 'https://images.unsplash.com/photo-1538254815620-1d3e0b3f14cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2416&q=80']);
  const [teacherShow, setTeacherShow] = useState(false);
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [currentFriend, setCurrentFriend] = useState('');
  const [friendSearch, setFriendSearch] = useState('');
  const [editInfoShow, setEditInfoShow] = useState(false);
  const [teacherId, setTeacherId] = useState('1');
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [modalClassName, setModalClassName] = useState('')
  const [classShow, setClassShow] = useState(false)
  const [pickDateShow, setPickDateShow] = useState(false);




  var [x, setx] = useState(0);
  // function for the image to expand on click
  // on click function to move the carousel to the left
  const goLeft = () => {
    setx(x - 1);
  }
  // on click function to move the carousel to the right
  const goRight = () => {
    setx(x + 1);
  }

  useEffect(() => {
    // axios.get(`${serverURL}/friend`).then((friends)=>{
    //   console.log('friends ', friends)
    // }).catch((err)=>{console.log('error getting friends ', err)})
    axios.get(`${serverURL}/classes`, { params: { teacher_id: teacherId } }).then((classData) => {
      setClasses(classData.data)
    }).catch((err) => { console.log('error getting classes ', err) })
  }, [])

  const onFriendClick = (e) => {
    setShow(true);
    setCurrentFriend(e.target.id);
    console.log('clicking on friend')
  }

  const onAddFriendClick = () => {
    setAddShow(true);
  }
  const onClassListClick = (e, class_name) => {
    e.preventDefault()
    axios.get(`${serverURL}/classes/students`, { params: { class_id: e.target.id } }).then((students) => {
      console.log(students.data)
      setStudents(students.data)
      setModalClassName(class_name)
      setClassShow(true)
    }).catch(err => { console.log(err) })
  }


  const onFriendSearch = (e) => {
    setFriendSearch(e.target.value);
  }

  const onEditInfo = () => {
    setEditInfoShow(true);
  }

  const [filteredFriends, setFilteredFriends] = useState(props.friends);

  const filterFriends = (e) => {
    setFilteredFriends(props.friends.filter(function (str) {
      var lowered = str.toLowerCase();
      return lowered.includes(e.target.value);
    }));
    console.log(filteredFriends);
  }


const onCalendarClick=( dateTime, friend, user) => {
  console.log('click and dateTime ', dateTime)
  setPickDateShow(false)

}

  return (
    <div>
      <ProfileContainer>
        <ProfilePicture src={props.profilePicture} />
        {!props.darkTheme ?
          <ProfileBackground>
            <img src={profileBackground[x]} style={{ textAlign: 'left', display: 'block' }} />
            {x === 0 ? null : <LeftButton data-testid='left-arrow' onClick={goLeft}><FontAwesomeIcon icon={faChevronLeft} /></LeftButton>}
            {x >= profileBackground.length - 1 ? null : <RightButton data-testid='right-arrow' onClick={goRight}><FontAwesomeIcon icon={faChevronRight} /></RightButton>}
          </ProfileBackground> :
          <ProfileBackground>
            <img src={profileBackgroundDark[x]} style={{ textAlign: 'left', display: 'block' }} />
            {x === 0 ? null : <LeftButton data-testid='left-arrow' onClick={goLeft}><FontAwesomeIcon icon={faChevronLeft} /></LeftButton>}
            {x >= profileBackgroundDark.length - 1 ? null : <RightButton data-testid='right-arrow' onClick={goRight}><FontAwesomeIcon icon={faChevronRight} /></RightButton>}
          </ProfileBackground>
        }
        <TeacherCalendar />
        {/* <ProfileAccountInfo>
          <h3><strong>Account Info</strong></h3>
          <h4><strong>Teacher</strong></h4>
          <table>
            <tr>
              <td>Name:</td>
              <td>{props.firstName} {props.lastName}</td>
            </tr>
            <tr>
              <td>E-mail:</td>
              <td>{props.email}</td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>*********</td>
            </tr>
          </table>
          <StyledButton onClick={onEditInfo} style={{marginTop: '1rem'}}>EDIT INFO</StyledButton>
        </ProfileAccountInfo>
          </table> */}

        {/* </ProfileAccountInfo> */}
        <ProfileFriendsList style={{ width: '30rem', left: '32%' }}>
          <StyledFriendSearchSpan>
            <h3><strong>Friends List</strong></h3>
            <StyledFriendSearch>
              <input name='friendfilter' type='text' placeholder='filter' onChange={filterFriends}></input>
              <input type='submit' value='Search' style={{ cursor: 'pointer' }} />
            </StyledFriendSearch>
          </StyledFriendSearchSpan>
          <p>
            {filteredFriends.map(friend => {
              return (
                <StyledFriend id={friend} >
                  <div style={{ fontWeight: 'bold' }} onClick={(onFriendClick)}>{friend}</div>
                  {pickDateShow && <ScheduleModal onClose={(dateTime)=>{onCalendarClick(dateTime, friend, teacherId)}} pickDateShow={pickDateShow} friend={friend} user={teacherId}/>}
                  <StyledFriendIcons>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Calendar_icon_2.svg/989px-Calendar_icon_2.svg.png" alt="calendar icon for setting up a video call"  onClick={()=>{setPickDateShow(true)}}/>
                    <img src='https://pnggrid.com/wp-content/uploads/2021/12/Office-Phone-Icon-PNG-Transparent-Background.png' alt='phone icon for starting a call with friend' />
                    <img src='https://cdn-icons-png.flaticon.com/512/71/71580.png' alt="message icon for starting a message chat with a friend" />
                  </StyledFriendIcons>
                </StyledFriend>
              )
            })}
          </p>

          <StyledButton style={{ marginTop: '0rem', width: '12rem' }} onClick={onAddFriendClick}>ADD FRIEND</StyledButton>
          {teacherShow && <TeacherClassListModal onClose={() => setTeacherShow(false)} />}
        </ProfileFriendsList>
        {/* <ProfileFriendsList style={{width: '23rem', left: '71%'}}>
          <StyledFriendSearchSpan style={{justifyContent: 'center'}}>
            <h3><strong>Class List</strong></h3>
          </StyledFriendSearchSpan>
          <p>
            {classes.map(teacherClass => {
              return (
                <StyledFriend key={teacherClass.class_id} id={teacherClass.class_id} onClick={(e)=>{onClassListClick(e, teacherClass.class_name)}} >
                  <div style={{ fontWeight: 'bold' }} >{teacherClass.class_name}</div>
                  <StyledFriendIcons>
                  </StyledFriendIcons>
                </StyledFriend>
              )
            })}
          </p>
          {classShow && <ClassListModal onClose={()=>setClassShow(false)} classShow={classShow} modalClassName={modalClassName} students={students}/>}
          <StyledButton style={{ marginTop: '0rem', marginLeft: '1rem', width: '12rem'}} onClick={()=> {setTeacherShow(true)}}>ADD CLASS LIST</StyledButton>
          {teacherShow && <TeacherClassListModal onClose={()=>setTeacherShow(false)} show={teacherShow} onFriendSearch={onFriendSearch}/>}

        </ProfileFriendsList> */}
      </ProfileContainer>
      <FriendsModal onClose={() => setShow(false)} show={show} friend={currentFriend} />
      <AddFriendModal onClose={() => setAddShow(false)} show={addShow} onFriendSearch={onFriendSearch} />
      <TeacherClassListModal onClose={() => setTeacherShow(false)} show={teacherShow} onFriendSearch={onFriendSearch} />
      <EditInfoModal onClose={() => setEditInfoShow(false)} show={editInfoShow} />
    </div>
  )
}