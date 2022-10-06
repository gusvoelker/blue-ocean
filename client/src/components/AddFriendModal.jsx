import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { serverURL } from '../config.js';
import axios from 'axios';
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

  useEffect(() => {
    let nameArray = props.usersWithSameLanguage.map(user => {
      let obj = {
        friend_name: `${user.first_name} ${user.last_name}`,
        id: user.account_id
      }
      return obj;
    })
    setSearchedFriends(nameArray);
    console.log(nameArray)
  }, [props.usersWithSameLanguage])

  const [searchedFriends, setSearchedFriends] = useState(['Frodo', 'Gandalf', 'Legolas', 'Bilbo']);

  const handleSelect = (e) => {
    let accounts = [];
    let language = e.target.value;
    if (language === 'any') {
      let nameArray = props.usersWithSameLanguage.map(user => {
        let obj = {
          friend_name: `${user.first_name} ${user.last_name}`,
          id: user.account_id
        }
        return obj;
      })
      setSearchedFriends(nameArray);
    } else {
      props.usersWithSameLanguage.forEach((account) => {
        if (account.language.length > 0) {
          account.language.forEach(item => {
            if (item.lang_name === language) {
              accounts.push(account);
            }
          })
        }
      })
      let nameArray = accounts.map(user => {
        let obj = {
          friend_name: `${user.first_name} ${user.last_name}`,
          id: user.account_id
        }
        return obj;
      })
      console.log(nameArray);
      setSearchedFriends(nameArray);
    }
  }

  const addFriend = (e) => {
    axios.post(`${serverURL}/friend`, {
      requestedId: e.target.id
    })
    .then(response => {
      //TODO: display success to client
      console.log(response)
    })
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
        <StyledSelectInput onChange={handleSelect} style={{marginTop: '-2rem'}}>
          <option value='any'>any</option>
          {props.languages.map(language => {
            return (
              <option value={language.lang_name}>{language.lang_name}</option>
            )
          })}
        </StyledSelectInput>
        <p style={{height: '15rem'}}>
          {searchedFriends.map((friend) => {
            return (
              <StyledFriend >
                <div style={{ fontWeight: 'bold', height: '1rem' }}>{friend.friend_name}</div>
                <StyledButton id={friend.id} style={{ marginTop: '0rem', width: '8rem'}} onClick={addFriend}>ADD FRIEND</StyledButton>
              </StyledFriend>
            )
          })}
        </p>
        <StyledButton onClick={props.onClose}>Close</StyledButton>
      </ProfileFriendsList>
    </FriendsModalContainer>
  )
}