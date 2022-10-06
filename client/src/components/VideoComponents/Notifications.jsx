import React, { useContext } from 'react';
import styled from 'styled-components';

import { SocketContext } from './SocketContext.jsx'

const Notifications = () => {

  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'center', zIndex: '20' }}>
          <h1>{call.name} is calling: </h1>
          <StyledButton type="button" onClick={answerCall} style={{marginTop: '-4rem'}}>
            Answer
          </StyledButton>
        </div>
      )}
    </>
  )
}
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

export default Notifications;