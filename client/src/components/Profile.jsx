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
  AddPicture,
} from './StyledComponents/StyledComponents.jsx';
import FriendsModal from './FriendsModal.jsx';
import AddFriendModal from './AddFriendModal.jsx';

export default function Profile (props) {
  const [name, setname] = useState('Anthony');
  const [email, setEmail] = useState('hello@gmail.com');
  const [password, setPassword] = useState('');
  const [friends, setFriends] = useState(['Adam', 'Bob', 'Charlie', 'Daniel', 'Emily', 'Florenza', 'Emily', 'Florenza']);
  const [role, setRole] = useState('Student')
  const [profilePicture, setProfilePicture] = useState('https://i.postimg.cc/gkDMWvVY/photo-1615497001839-b0a0eac3274c.jpg');
  const [profileBackground, setProfileBackground] = useState('https://i.postimg.cc/hGpk2kjq/denis-istomin-sunset-120317-night-long.jpg');
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [currentFriend, setCurrentFriend] = useState('');

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

  const onFriendClick = (e) => {
    setShow(true);
    setCurrentFriend(e.target.id);
    console.log('clicking on friend')
  }

  const onAddFriendClick = () => {
    setAddShow(true);
  }

  return (
    <div>
      <ProfileContainer>
        <ProfilePicture src={profilePicture} />
        <ProfileBackground src={profileBackground}></ProfileBackground>
        {/* <AddPicture src='https://i.postimg.cc/65z5t7jr/3465604-200.png'></AddPicture> */}
        <ProfileAccountInfo>
          <h3><strong><u>Account Info</u></strong></h3>
          <h4><strong>{role}</strong></h4>
          <table>
            <tr>
              <td>Name:</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>E-mail:</td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>*********</td>
            </tr>
          </table>
          <StyledButton style={{marginTop: '1rem'}}>EDIT INFO</StyledButton>
        </ProfileAccountInfo>
        <ProfileFriendsList>
          <StyledFriendSearchSpan>
            <h3><strong>Friends List</strong></h3>
            <StyledFriendSearch>
              <input name='friendfilter' type='text' placeholder='filter'></input>
              <input type='submit' value='Search' style={{cursor: 'pointer'}}/>
            </StyledFriendSearch>
          </StyledFriendSearchSpan>
          <p>
            {friends.map(friend => {
            return (
              <StyledFriend  id={friend} onClick={onFriendClick}>
                <div style={{fontWeight: 'bold'}}>{friend}</div>
                <StyledFriendIcons>
                  <img src='https://cdn-icons-png.flaticon.com/512/71/71580.png'/>
                </StyledFriendIcons>
              </StyledFriend>
            )
          })}
          </p>
          <StyledButton style={{marginTop: '0rem'}} onClick={onAddFriendClick}>ADD FRIEND</StyledButton>

            {/* //return (<div id={friend} onClick={onFriendClick}>{friend}</div>)
          //})}
          //</p>
          //<LightGreyButton onClick={onAddFriendClick}>Add Friend +</LightGreyButton> */}
        </ProfileFriendsList>
      </ProfileContainer>
      <FriendsModal onClose={() => setShow(false)} show={show} friend={currentFriend} />
      <AddFriendModal onClose={() => setAddShow(false)} show={addShow} />
    </div>
  )
}