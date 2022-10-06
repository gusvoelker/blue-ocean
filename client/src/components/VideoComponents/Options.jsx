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
            <StyledOption>
              <h2>Account Info</h2>
              <input label="Name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <CopyToClipboard text={me}>
                <StyledButton type="button">
                  COPY YOUR ID
                </StyledButton>
              </CopyToClipboard>
            </StyledOption>
            <StyledOption>
              <h2>Make a call</h2>
              <input label="ID to Call" placeholder="ID to Call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
              {callAccepted && !callEnded ? (
                <StyledButton type="button" onClick={leaveCall}>
                  HANG UP
                </StyledButton>
              ) : (
                <StyledButton type="button" onClick={() => {
                  callUser(idToCall);
                }}>
                  CALL
                </StyledButton>
              )}
            </StyledOption>
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
  gap: 1rem;
`
const StyledOption = styled.div`
  background-color: #3838388d;
  padding: 1rem;
  border-radius: 1.5rem;
  border: 1px solid #386A8F;
  h2 {
    text-align: center;
  }
`

const Container = styled.section`
  display: flex;
  width: 600px;
  margin: 10px;
  justify-content: center;
  div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    input {
      border-radius: 50px;
      border: none;
      color: #383838S;
      padding: 1rem;
    }
  }
`

const Paper = styled.div`
  display: flex;
  padding: 1rem;
  border-radius: 20px;
`

const StyledButton = styled.div`
  display: flex;
  border-radius: 50px;
  border: none;
  background-color: #f5f5f5;
  color: #383838;
  padding: 1rem;
  border: 1px solid #386A8F;
  transition: 0.3s;
  justify-content: center;
  align-items: center;
  &:hover {
    color: #f5f5f5;
    background-color: #386A8F;
  }
`