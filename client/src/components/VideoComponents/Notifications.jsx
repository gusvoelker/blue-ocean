import React, { useContext } from 'react'

import { SocketContext } from './SocketContext.jsx'

const Notifications = () => {

  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'center', zIndex: '20' }}>
          <h1>{call.name} is calling: </h1>
          <button type="button" onClick={answerCall}>
            Answer
          </button>
        </div>
      )}
    </>
  )
}

export default Notifications;