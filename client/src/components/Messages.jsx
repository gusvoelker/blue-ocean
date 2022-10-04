import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import { io } from 'socket.io-client';
import {
  MessagesConvoContainer,
  LightGreyButton,
  MessagesChatContainer,
  MessagesTextContainer,
  MyMessage,
  TheirMessage,
  MessagesTopContainer,
  StyledButton,
  ProfileFriendsList,
  MessageFriends,
  MessageProfilePic,
  StyledWriteMessage,
  StyledSubmitInput
}
from './StyledComponents/StyledComponents.jsx';

export default function Messages () {
  const friends = ['Adam', 'Bob', 'Charlie', 'Daniel', 'Emily', 'Florenza', 'Adam', 'Bob', 'Charlie', 'Daniel', 'Emily', 'Florenza', 'Adam', 'Bob', 'Charlie', 'Daniel', 'Emily', 'Florenza'];
  const [profilePicture, setProfilePicture] = useState('https://i.postimg.cc/gkDMWvVY/photo-1615497001839-b0a0eac3274c.jpg');
  const [currentFriend, setCurrentFriend] = useState('Adam');
  const [friendsPicture, setFriendsPicture] = useState('https://i.postimg.cc/Kv8V2zHT/catbehavior-HERO-1024x576.jpg')
  const socket = useRef();


  useEffect(()=> {
    socket.current = io('ws://localhost:8080');
  }, []);

  useEffect(() => {
    socket.current.emit('addUser', 555);
    socket.current.on('receiveMessage', message => {
      console.log(message);
  })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.current.emit('sendMessage', {
      senderId: socket.id,
      receiverId: socket.id,
      text: 'Hello There',
    })
  }


  return (
    <div>
      <MessagesConvoContainer>
        <p>Messages</p>
        <MessageFriends>
          {friends.map(friend => {
            return (
              <React.Fragment>
                <StyledButton>
                  {friend}
                  <MessageProfilePic src={profilePicture}></MessageProfilePic>
                </StyledButton>
              </React.Fragment>
            )
          })}
        </MessageFriends>
      </MessagesConvoContainer>
      <MessagesChatContainer>
        <MessagesTextContainer>
          <MyMessage>
            Hey how are you doing today
            <img src={profilePicture}></img>
          </MyMessage>
          <TheirMessage>
            I'm doing fine
            <img src={friendsPicture}></img>
          </TheirMessage>
          <MyMessage>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <img src={profilePicture}></img>
          </MyMessage>
        </MessagesTextContainer>
        <MessagesTopContainer>
          <img src={friendsPicture}></img>
          {currentFriend}
        </MessagesTopContainer>
        <StyledWriteMessage>
          <textarea placeholder='write your message'>
          </textarea>
          <StyledSubmitInput style={{width: '10rem', border: '1px solid #383838'}} value='Send' onClick={handleSubmit}/>
        </StyledWriteMessage>
      </MessagesChatContainer>
    </div>
  )
}