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
} from './StyledComponents/StyledComponents.jsx'

export default function Profile (props) {
  const [name, setname] = useState('Anthony');
  const [email, setEmail] = useState('hello@gmail.com');
  const [password, setPassword] = useState('');
  const [friends, setFriends] = useState(['Adam', 'Bob', 'Charlie', 'Daniel', 'Emily', 'Florenza', 'Emily', 'Florenza']);
  const [role, setRole] = useState('Student')
  const [profilePicture, setProfilePicture] = useState('https://i.postimg.cc/gkDMWvVY/photo-1615497001839-b0a0eac3274c.jpg');
  const [profileBackground, setProfileBackground] = useState('https://i.postimg.cc/hGpk2kjq/denis-istomin-sunset-120317-night-long.jpg');

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
          <h3><strong><u>Account Info</u></strong></h3>
          <div><strong>{role}</strong></div>
          <div>Name: {name}</div>
          <div>Email: {email}</div>
          <div>Password: ***********</div>
        </ProfileAccountInfo>
        <ProfileFriendsList>
          <h3><strong><u>Friends List</u></strong></h3>
          <p>
            {friends.map(friend => {
            return (<div>{friend}</div>)
          })}
          </p>
          <LightGreyButton>Add Friend +</LightGreyButton>
        </ProfileFriendsList>
        <ProfileChatContainer>
          <LightGreyButton>Create Chat Room</LightGreyButton>
          <LightGreyButton>Create Video Call</LightGreyButton>
        </ProfileChatContainer>
      </ProfileContainer>
    </div>
  )
}