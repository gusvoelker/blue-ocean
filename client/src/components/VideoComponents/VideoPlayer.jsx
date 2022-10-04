import React, { useContext } from 'react'
import { SocketContext } from './SocketContext.jsx'
import styled from 'styled-components'

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

  return (
    <Grid>
      <Paper>
        <MyVideoDiv>{name || 'Name'}</MyVideoDiv>
        <VideoHolder playsInline muted ref={myVideo} autoPlay />
      </Paper>
      {callAccepted && !callEnded && (
        <Paper>
          <MyVideoDiv>{name || 'Name'}</MyVideoDiv>
          <VideoHolder playsInline ref={userVideo} autoPlay />
        </Paper>
      )}
    </Grid>
  )
}

export default VideoPlayer;

const Grid = styled.div`
  display: flex;
  height: 60%;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: -3rem;
`

const Paper = styled.div`
  display: flex;
  border: 2px solid black;
  border-radius: 20px;
  margin: 10px;
  background-color: white;
  position: relative;
  justify-content: center;
`

const MyVideoDiv = styled.div`
  display: flex;
  color: #9292ce;
  position: absolute;
  bottom: 0;
`

const VideoHolder = styled.video`
  display: flex;
  width: 50rem;
`