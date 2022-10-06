import React, { useState, useEffect } from "react";
import styled from 'styled-components';
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
    let nameArray = props.usersWithSameLanguage.map(user => {
      return `${user.first_name} ${user.last_name}`
    })
    setSearchedFriends(nameArray);
  }, [props.usersWithSameLanguage])

  const [searchedFriends, setSearchedFriends] = useState(['Frodo', 'Gandalf', 'Legolas', 'Bilbo']);

  return (
    <FriendsModalContainer>
      <ProfileFriendsList style={{position: 'relative', left: '0%'}}>
        <h3 style={{marginTop: '-0.5rem'}}><strong>Pending Requests</strong></h3>
        <p style={{height: '15rem'}}>
          {test.map((friend) => {
            return (
              <StyledFriend >
                <div style={{ fontWeight: 'bold', height: '1rem' }}>{friend}</div>
                <StyledFriendIcons>
                  <StyledButton style={{width: '6rem'}}>ACCEPT</StyledButton>
                  <StyledButton style={{width: '6rem'}}>DECLINE</StyledButton>
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