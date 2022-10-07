import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  FriendsModalContainer,
  FriendsModalContent,
  LightGreyButton,
  StyledButton,
  ScheduleModalContainer,
  ScheduleModalContent,
} from '../../StyledComponents/StyledComponents.jsx';
import DateTimePicker from 'react-datetime-picker';


export default function ScheduleModal({ onClose, friend}) {
  const [value, onChange] = useState(new Date());

  return (
    <ScheduleModalContainer>
      <ScheduleModalContent>
      <h3 style={{marginTop: '-0.5rem'}}><strong> Invite your friend {friend.first_name} {friend.last_name} to video call!</strong></h3>
        <div>
          <DateTimePicker disableClock={true} onChange={onChange} value={value} />
        </div>
        <br></br>
        <StyledButton onClick={()=>{onClose(value)}}>Send Invite</StyledButton>
      </ScheduleModalContent>
    </ScheduleModalContainer>
  )
}