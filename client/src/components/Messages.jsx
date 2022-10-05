import React, { useState, useEffect, useRef, useContext } from "react";
import styled from 'styled-components';
import { io } from 'socket.io-client';
import { SocketContext } from './VideoComponents/SocketContext.jsx';
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
  const [friendsPicture, setFriendsPicture] = useState('https://i.postimg.cc/Kv8V2zHT/catbehavior-HERO-1024x576.jpg');
  const [message, setMessage] = useState('');
  const { user } = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const socket = useRef();

  // useEffect(() => {
  //   //this should fetch all conversations for the current user
  // }, [user)

  useEffect(()=> {
    socket.current = io('ws://localhost:8080');
    socket.current.on("getMessage", (data) =>{
      console.log(data);
    })
  }, [user]);

  useEffect(()=> {
    if (user !== undefined) {
      socket.current.emit('addUser', user.id);
      socket.current.on('getUsers', (users) => {
        console.log(users)
      })
    }
  }, [user]);



  // useEffect(() => {
  //   // scrollRef?.current.scrollIntoView({behavior: 'smooth'})
  //   socket.current.emit('addUser', user.id);
  //   socket.current.on('receiveMessage', message => {
  //     console.log(message);
  //     setMessages([...messages, message])
  // })
  // }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //post a new message to the database
    //setMessages([...messages, res.data/message ])
    //setMessage('');
    //need to find a way to get the receiver id
    socket.current.emit('sendMessage', {
      senderId: 11, //user.id
      receiverId: 12,
      text: message,
    })
  };

  const handleChange = (e) =>{
    setMessage(e.target.value);
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
          <textarea placeholder='write your message' onChange={handleChange}>
          </textarea>
          <StyledSubmitInput style={{width: '10rem', border: '1px solid #383838'}} value='Send' onClick={handleSubmit}/>
        </StyledWriteMessage>
      </MessagesChatContainer>
    </div>
  )
}

//need to map over the messages and contain them in a div that uses ref={scrollRef}