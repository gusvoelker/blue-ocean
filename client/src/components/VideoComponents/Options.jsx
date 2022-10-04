import React, { useContext, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styled from 'styled-components'

import { SocketContext } from './SocketContext.jsx'

const Options = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  return (
    <Container>
      <Paper>
        <form>
          <GridContainer>
            <div>
              <div>Account Info</div>
              <input label="Name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <CopyToClipboard text={me}>
                <button type="button">
                  Copy Your ID
                </button>
              </CopyToClipboard>
            </div>
            <div>
              <div>Make a call</div>
              <input label="ID to Call" placeholder="ID to Call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
              {callAccepted && !callEnded ? (
                <button type="button" onClick={leaveCall}>
                  Hang Up
                </button>
              ) : (
                <button type="button" onClick={() => {
                  callUser(idToCall);
                }}>
                  Call
                </button>
              )}
            </div>
          </GridContainer>
        </form>
        {children}
      </Paper>
    </Container>
  )
}

export default Options;


const GridContainer = styled.section`
  display: flex;
  width: 100%;
`

const Container = styled.section`
  display: flex;
  width: 600px;
  margin: 10px;
`

const Paper = styled.div`
  display: flex;
  border: 2px solid black;
`