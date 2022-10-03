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
import TeacherClassListModal from './LoginSignup/Teacher/TeacherClassListModal.jsx'

export default function TeacherProfile(props) {
  const [name, setname] = useState('Anthony');
  const [email, setEmail] = useState('hello@gmail.com');
  const [password, setPassword] = useState('');
  const [friends, setFriends] = useState(['Adam', 'Bob', 'Charlie', 'Daniel', 'Emily', 'Florenza', 'Emily', 'Florenza']);
  const [role, setRole] = useState('Student')
  const [profilePicture, setProfilePicture] = useState('https://i.postimg.cc/gkDMWvVY/photo-1615497001839-b0a0eac3274c.jpg');
  const [profileBackground, setProfileBackground] = useState('https://i.postimg.cc/hGpk2kjq/denis-istomin-sunset-120317-night-long.jpg');
  const [teacherShow, setTeacherShow] = useState(false);



  // const onProfilePictureChange = () => {
  //   axios.put(`/profile/${email}/profilepic`, { profilePicture: profilePicture })
  // }

  // const onProfileBackgroundChange = () => {
  //   axios.put(`/profile/${email}/background`, { profileBackground: profileBackground })
  // }

  // const onAddFriend = () => {
  //   axios.post(`/profile/${email}/friends`, { friends: friends})
  // }

  // const onChangePassword = () => {
  //   axios.put(`/profile/${email}/password`, { password: password })
  // }

  // createEffect(() => {
  //   axios.get(`/profile/${props.email}`)
  // })


  return (
    <div>
      <ProfileContainer>
        <ProfilePicture src={profilePicture} />
        <ProfileBackground src={profileBackground}></ProfileBackground>
        <ProfileAccountInfo>
          <h3><strong>ACCOUNT INFO</strong></h3>
          <div><strong>{role}</strong></div>
          <div>Name: {name}</div>
          <div>Email: {email}</div>
          <div>Password: ***********</div>
          <StyledButton style={{ marginTop: '1rem' }}>EDIT INFO</StyledButton>
        </ProfileAccountInfo>
        <ProfileFriendsList>
          <StyledFriendSearchSpan>
            <h3><strong>Friends List</strong></h3>
            <StyledFriendSearch>
              <input name='friendfilter' type='text' placeholder='filter'></input>
              <input type='submit' value='Search' style={{ cursor: 'pointer' }} />
            </StyledFriendSearch>
          </StyledFriendSearchSpan>
          <p>
            {friends.map(friend => {
              return (
                <StyledFriend>
                  <div style={{ fontWeight: 'bold' }}>{friend}</div>
                  <StyledFriendIcons>
                    <img src='https://pnggrid.com/wp-content/uploads/2021/12/Office-Phone-Icon-PNG-Transparent-Background.png' alt='phone icon for starting a call with friend' />
                    <img src='https://cdn-icons-png.flaticon.com/512/71/71580.png' />
                  </StyledFriendIcons>
                </StyledFriend>
              )
            })}
          </p>
          <StyledButton style={{ marginTop: '0rem' }}>ADD FRIEND</StyledButton>
          <StyledButton style={{ marginTop: '0rem', marginLeft: '1rem'}} onClick={()=> {setTeacherShow(true)}}>ADD CLASS LIST</StyledButton>
          {teacherShow && <TeacherClassListModal onClose={()=>setTeacherShow(false)} />}
        </ProfileFriendsList>
      </ProfileContainer>
    </div>
  )
}