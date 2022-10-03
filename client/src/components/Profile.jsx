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
} from './StyledComponents/StyledComponents.jsx'

import { faChevronLeft, faChevronRight, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Slide = styled.div`
  text-align: initial;
  min-width: 100%;
  transition: 0.5s;
  img {
    transition: 0.5s;
    border-radius: 5px;
    @media (max-width: 600px) {
      width: 17rem;
      height: auto;
    }
  }
`
// left button for carousel
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

import FriendsModal from './FriendsModal.jsx';
import AddFriendModal from './AddFriendModal.jsx';

export default function Profile({ darkTheme }) {
  const [name, setname] = useState('Anthony');
  const [email, setEmail] = useState('hello@gmail.com');
  const [password, setPassword] = useState('');
  const [friends, setFriends] = useState(['Adam', 'Bob', 'Charlie', 'Daniel', 'Emily', 'Florenza', 'Emily', 'Florenza']);
  const [role, setRole] = useState('Student')
  const [profilePicture, setProfilePicture] = useState('https://i.postimg.cc/gkDMWvVY/photo-1615497001839-b0a0eac3274c.jpg');
  const [profileBackground, setProfileBackground] = useState(['https://images.unsplash.com/photo-1470125634816-ede3f51bbb42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1998&q=80', 'https://images.unsplash.com/photo-1552288084-454d4fa5caa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2170&q=80', 'https://images.unsplash.com/photo-1606335270813-52d62bfc5e69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2525&q=80', 'https://images.unsplash.com/photo-1591467847734-12186c3a3f1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2156&q=80', 'https://images.unsplash.com/photo-1603731125936-1c28b35b1659?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1905&q=80', 'https://images.unsplash.com/photo-1590918836821-3c692676add7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80']);
  const [profileBackgroundDark, setProfileBackgroundDark] = useState(['https://images.unsplash.com/photo-1475738198235-4b30fc20cff4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1976&q=80', 'https://images.unsplash.com/photo-1552288084-454d4fa5caa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2170&q=80', 'https://images.unsplash.com/photo-1504069424204-a54566b5165c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1984&q=80', 'https://images.unsplash.com/photo-1529984489975-079884dc3bc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2320&q=80', 'https://images.unsplash.com/photo-1538254815620-1d3e0b3f14cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2416&q=80']);
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

  return (
    <div>
      <ProfileContainer>
        <ProfilePicture src={profilePicture} />
        {!darkTheme ?
        <ProfileBackground>
          <img src={profileBackground[x]} style={{textAlign: 'left', display: 'block'}}/>
          {x === 0 ? null : <LeftButton data-testid='left-arrow' onClick={goLeft}><FontAwesomeIcon icon={faChevronLeft} /></LeftButton>}
          {x >= profileBackground.length - 1 ? null : <RightButton data-testid='right-arrow' onClick={goRight}><FontAwesomeIcon icon={faChevronRight} /></RightButton>}
        </ProfileBackground> :
        <ProfileBackground>
          <img src={profileBackgroundDark[x]} style={{textAlign: 'left', display: 'block'}}/>
          {x === 0 ? null : <LeftButton data-testid='left-arrow' onClick={goLeft}><FontAwesomeIcon icon={faChevronLeft} /></LeftButton>}
          {x >= profileBackgroundDark.length - 1 ? null : <RightButton data-testid='right-arrow' onClick={goRight}><FontAwesomeIcon icon={faChevronRight} /></RightButton>}
        </ProfileBackground>
      }
        <ProfileAccountInfo>
          <h3><strong>Account Info</strong></h3>
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
              <td>Language:</td>
              <td>Elvish</td>
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
          <StyledButton>PENDING REQUESTS</StyledButton>

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