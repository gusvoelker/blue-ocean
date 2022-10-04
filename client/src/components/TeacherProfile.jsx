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
  StyledFriendSearch
} from './StyledComponents/StyledComponents.jsx'
import axios from 'axios';
import FormData from 'form-data'
import TeacherClassListModal from './LoginSignup/Teacher/TeacherClassListModal.jsx';
import { faChevronLeft, faChevronRight, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FriendsModal from './FriendsModal.jsx';
import AddFriendModal from './AddFriendModal.jsx';
import EditInfoModal from './EditInfoModal.jsx';

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
  const [teacherShow, setTeacherShow] = useState(false);
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [currentFriend, setCurrentFriend] = useState('');
  const [friendSearch, setFriendSearch] = useState('');
  const [editInfoShow, setEditInfoShow] = useState(false);

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

  const onFriendClick = (e) => {
    setShow(true);
    setCurrentFriend(e.target.id);
    console.log('clicking on friend')
  }

  const onAddFriendClick = () => {
    setAddShow(true);
  }

  const onFriendSearch = (e) => {
    setFriendSearch(e.target.value);
  }

  const onEditInfo = () => {
    setEditInfoShow(true);
  }

  return (
    <div>
      <ProfileContainer>
        <ProfilePicture src={props.profilePicture} />
        <ProfileBackground>
          <img src={profileBackground[x]} style={{textAlign: 'left', display: 'block'}}/>
          {x === 0 ? null : <LeftButton data-testid='left-arrow' onClick={goLeft}><FontAwesomeIcon icon={faChevronLeft} /></LeftButton>}
          {x >= profileBackground.length - 1 ? null : <RightButton data-testid='right-arrow' onClick={goRight}><FontAwesomeIcon icon={faChevronRight} /></RightButton>}
        </ProfileBackground>
        <ProfileAccountInfo>
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
        <ProfileFriendsList style={{width: '30rem', left: '32%'}}>
          <StyledFriendSearchSpan>
            <h3><strong>Friends List</strong></h3>
            <StyledFriendSearch>
              <input name='friendfilter' type='text' placeholder='filter'></input>
              <input type='submit' value='Search' style={{ cursor: 'pointer' }} />
            </StyledFriendSearch>
          </StyledFriendSearchSpan>
          <p>
            {props.friends.map(friend => {
              return (
                <StyledFriend id={friend} onClick={onFriendClick}>
                  <div style={{ fontWeight: 'bold' }}>{friend}</div>
                  <StyledFriendIcons>
                    <img src='https://pnggrid.com/wp-content/uploads/2021/12/Office-Phone-Icon-PNG-Transparent-Background.png' alt='phone icon for starting a call with friend' />
                    <img src='https://cdn-icons-png.flaticon.com/512/71/71580.png' />
                  </StyledFriendIcons>
                </StyledFriend>
              )
            })}
          </p>
          <StyledButton style={{ marginTop: '0rem', width: '12rem' }} onClick={onAddFriendClick}>ADD FRIEND</StyledButton>
          {teacherShow && <TeacherClassListModal onClose={()=>setTeacherShow(false)} />}
        </ProfileFriendsList>
        <ProfileFriendsList style={{width: '23rem', left: '71%'}}>
          <StyledFriendSearchSpan style={{justifyContent: 'center'}}>
            <h3><strong>Class List</strong></h3>
          </StyledFriendSearchSpan>
          <p>
            {props.friends.map(friend => {
              return (
                <StyledFriend id={friend} onClick={onFriendClick}>
                  <div style={{ fontWeight: 'bold' }}>{friend}</div>
                  <StyledFriendIcons>
                  </StyledFriendIcons>
                </StyledFriend>
              )
            })}
          </p>
          <StyledButton style={{ marginTop: '0rem', marginLeft: '1rem', width: '12rem'}} onClick={()=> {setTeacherShow(true)}}>ADD CLASS LIST</StyledButton>
          {teacherShow && <TeacherClassListModal onClose={()=>setTeacherShow(false)} show={teacherShow} onFriendSearch={onFriendSearch}/>}
        </ProfileFriendsList>
      </ProfileContainer>
      <FriendsModal onClose={() => setShow(false)} show={show} friend={currentFriend} />
      <AddFriendModal onClose={() => setAddShow(false)} show={addShow} onFriendSearch={onFriendSearch}/>
      <TeacherClassListModal onClose={()=>setTeacherShow(false)} show={teacherShow} onFriendSearch={onFriendSearch}/>
      <EditInfoModal onClose={() => setEditInfoShow(false)} show={editInfoShow} />
    </div>
  )
}