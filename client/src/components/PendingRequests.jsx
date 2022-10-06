import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { serverURL } from '../config.js';
import {
  FriendsModalContainer,
  FriendsModalContent,
  LightGreyButton,
  StyledButton,
  ProfileFriendsList,
  StyledSelectInput,
  StyledFriend,
  StyledFriendIcons,
} from './StyledComponents/StyledComponents.jsx';

export default function PendingRequests (props) {
  if (!props.show) {
    return null;
  }

  useEffect(() => {

    let nameArray = props.pendingRequests.map(user => {
      let obj = {
        friend_name: `${user.first_name} ${user.last_name}`,
        id: user.account_id
      }
      return obj;
    })
    setSearchedFriends(nameArray);
  }, [props.pendingRequests])

  const [searchedFriends, setSearchedFriends] = useState(['Frodo', 'Gandalf', 'Legolas', 'Bilbo']);

  const addFriend = (e) => {
    axios.put(`${serverURL}/friend`, null, { params: {
      idToAccept: e.target.id
    }})
  }

  const removeFriend = (e) => {
    axios.delete(`${serverURL}/friend/request`, null, { params: {
      friend_id: e.target.id
    }})
  }

  return (
    <FriendsModalContainer>
      <ProfileFriendsList style={{position: 'relative', left: '0%'}}>
        <h3 style={{marginTop: '-0.5rem'}}><strong>Pending Requests</strong></h3>
        <p style={{height: '15rem'}}>
          {searchedFriends.map((friend) => {
            return (
              <StyledFriend >
                <div style={{ fontWeight: 'bold', height: '1rem' }}>{friend.friend_name}</div>
                <StyledFriendIcons>
                  <StyledButton style={{width: '6rem'}} id={friend.id} onClick={addFriend}>ACCEPT</StyledButton>
                  <StyledButton style={{width: '6rem'}} id={friend.id} onClick={removeFriend}>DECLINE</StyledButton>
                </StyledFriendIcons>
              </StyledFriend>
            )
          })}
        </p>
        <StyledButton onClick={props.onClose}>Close</StyledButton>
      </ProfileFriendsList>
    </FriendsModalContainer>
  )
}