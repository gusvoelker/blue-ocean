import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  MeetingModalContainer,
  MeetingModalContent,
  ClassListModalContent,
  LightGreyButton,
  StyledButton,
} from '../../StyledComponents/StyledComponents.jsx';
import axios from 'axios'
import {serverURL} from '../../../config.js'

export default function TeacherMeetingModal({ onClose, open, meetingsOnDay, day, teacherId, handleDelete }) {
  var dateString = day.toLocaleDateString()
  const [display, setDisplay] = useState(meetingsOnDay)

  useEffect(()=>{
    setDisplay(meetingsOnDay)
  }, [meetingsOnDay])

  return (
    <MeetingModalContainer>
      <MeetingModalContent>
      <h3 style={{marginTop: '-0.5rem'}}><strong>Your Scheduled Meetings on {dateString}</strong></h3>

        <div>
          {display && display.map((meeting, index )=> (
            <div key={index}>
              {meeting.status ? <div>{meeting.first_name} {meeting.last_name} on {meeting.dateObj} at {meeting.timeObj}   </div> : <div>{meeting.first_name} {meeting.last_name}  on {meeting.dateObj} at {meeting.timeObj} (pending)  </div>}
              <StyledButton style={{marginLeft: '5px'}} onClick={(e)=>{
                handleDelete(e, meeting.rec_account_id, meeting.req_account_id, meeting.start_time);
                onClose();
              }}>Delete</StyledButton>
            </div>

          ))}
        </div>

        <StyledButton onClick={onClose}>Close</StyledButton>
      </MeetingModalContent>
    </MeetingModalContainer>
  )
}