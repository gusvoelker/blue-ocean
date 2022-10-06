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
} from './StyledComponents/StyledComponents.jsx';

export default function AddFriendModal (props) {
  if (!props.show) {
    return null;
  }
  const [searchedFriends, setSearchedFriends] = useState(['Frodo', 'Gandalf', 'Legolas', 'Bilbo']);

  const handleSelect = (e) => {
    var accounts = []
    var language = e.target.value;
    axios.get(`${serverURL}/accounts`)
      .then((data) => {
        accounts = data
      }).catch((err) => {
        console.log(err);
      })
    // function to filter out all users that aren't learning that language
  }

  return (
    <FriendsModalContainer>
      {/* <FriendsModalContent>
        <h4>
          ADD FRIEND
        </h4>
        <input type="text" onChange={props.onFriendClick}></input>
        <br></br>
        <br></br>
        <StyledButton onClick={props.onClose}>Close</StyledButton>
      </FriendsModalContent> */}
      <ProfileFriendsList style={{position: 'relative', left: '0%'}}>
        <h3 style={{marginTop: '-0.5rem'}}><strong>Add Friends</strong></h3>
        <StyledSelectInput style={{marginTop: '-2rem'}}>
          <option value='teacher'>Teacher</option>
          <option value='user'>User</option>
        </StyledSelectInput>
        <p style={{height: '15rem'}}>
          {searchedFriends.map((friend) => {
            return (
              <StyledFriend >
                <div style={{ fontWeight: 'bold', height: '1rem' }}>{friend}</div>
                <StyledButton style={{ marginTop: '0rem', width: '8rem'}}>ADD FRIEND</StyledButton>
              </StyledFriend>
            )
          })}
        </p>
        <StyledButton onClick={props.onClose}>Close</StyledButton>
      </ProfileFriendsList>
    </FriendsModalContainer>
  )
}