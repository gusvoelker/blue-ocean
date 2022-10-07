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
import WriteMessage from './MessagesComponents/WriteMessage.jsx'





export default function Messages ({ friends }) {
  const [profilePicture, setProfilePicture] = useState('https://i.postimg.cc/gkDMWvVY/photo-1615497001839-b0a0eac3274c.jpg');
  const [currentFriend, setCurrentFriend] = useState({account_id: 4, first_name: 'Bill', last_name: 'from lotr', email: 'galad@gmail.edu', avatar_url: null});
  const [friendsPicture, setFriendsPicture] = useState('https://i.postimg.cc/Kv8V2zHT/catbehavior-HERO-1024x576.jpg');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [usersArray, setUsersArray] = useState([]);
  const [roomsArray, setRoomsArray] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(9);


  const { user } = useContext(SocketContext);
  const scrollRef = useRef();
  const socket = useRef();


  // useEffect(() => {
  //   //this should fetch all conversations for the current user
  // }, [user)
  useEffect(() => {
    console.log('mounted');
  }, []);

  // useEffect(()=> {

  // }, []);

  useEffect(() => {
    socket.current = io('ws://localhost:8080');
    socket.current.on("roomNumber", (roomNumber) => {
      setCurrentRoom(roomNumber);
      console.log(roomNumber);
    })
    socket.current.on("getMessage", (data) => {
      // console.log("currentFriend.first_name :", currentFriend.first_name);
      // console.log("data.roomNumber: ", data.roomNumber);
      // console.log("currentRoom: ", currentRoom);
      setMessages(messages => [...messages, data]);
      console.log(data);
    })
    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(()=> {
    if (user !== undefined) {
      socket.current.emit('addUser', user.id);
      socket.current.on('getUsers', (users) => {
        setUsersArray(users);
        console.log(users)
      })
      // socket.current.on('getRooms', (rooms) => {
      //   setRoomsArray(rooms);
      //   console.log("roomArray!: ", rooms);
      // })
    }
  }, []);



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
      senderId: user.id, //user.id
      receiverId: currentFriend.account_id,
      text: message,
      roomNumber: currentRoom
    })
  };

  const handleChange = (e) =>{
    setMessage(e.target.value);
  }

  // const friendClickHandler = (e) => {
  //   setCurrentFriend(e.target.value)
  // }
  const updateCurrentRoom = (id, friend) => {
    setCurrentFriend(friend);
    socket.current.emit('addRoom', user.id, id, currentRoom);
    setMessages([]);
  };

  // roomsArray.forEach((room) => {
  //   if (room.members.includes(id)) {
  //     setCurrentRoom(room.roomName);
  //     console.log("roomName:", room.roomName)
  //   }
  // });


  return (
    <div>
      <MessagesConvoContainer>
        <p>Messages</p>
        <MessageFriends>
          {friends.map((friend, i) => {
            return (
              <React.Fragment>
                <StyledButton key={i} onClick={() => {
                  updateCurrentRoom(friend.account_id, friend);
                  }}>
                  {friend.first_name}
                  <MessageProfilePic src={profilePicture}></MessageProfilePic>
                </StyledButton>
              </React.Fragment>
            )
          })}
        </MessageFriends>
      </MessagesConvoContainer>
      <MessagesChatContainer>
        <MessagesTextContainer>
          {messages.slice().reverse().map((message, i) => {
            return (
            <MyMessage key= {i}>
              {message.text}
            </MyMessage>
          )}
          )}
        </MessagesTextContainer>
        <MessagesTopContainer>
          <img src={friendsPicture}></img>
          {currentFriend.first_name}
        </MessagesTopContainer>
        <StyledWriteMessage>
          <WriteMessage handleChange={handleChange} handleSubmit={handleSubmit} />
        </StyledWriteMessage>
      </MessagesChatContainer>
    </div>
  )
}

//need to map over the messages and contain them in a div that uses ref={scrollRef}