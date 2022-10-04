import React, { useState } from 'react'
import styled from 'styled-components'
import VideoPlayer from './VideoComponents/VideoPlayer.jsx'
import Options from './VideoComponents/Options.jsx'
import Notifications from './VideoComponents/Notifications.jsx'
import { ContextProvider } from './VideoComponents/SocketContext.jsx'

function App() {


  return (
    <MainDiv>
      <AppBar>
        Video Chat
      </AppBar>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </MainDiv>
  )
}

export default App

const MainDiv = styled.div`
  display: flex;
  height: 98vh;
  width: 99vw;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
`
const AppBar = styled.div`
  display: flex;
  color: white;
  height: 85px;
  width: 20%;
  background-color: #372f2f;
  position: absolute;
  top: 0;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  margin: 15px;
  border-radius: 10px;
  cursor: pointer;
`