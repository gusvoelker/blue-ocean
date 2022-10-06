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

export default function TeacherMeetingModal({ onClose, open, meetingsOnDay, day, props }) {
  console.log('day in modal ', typeof day, day)
  var dateString = day.toLocaleDateString()

  const handleDelete = (userId, start_time) => {
    axios.put(`${serverURL}/meetings/delete`, {params: {receiverId: props.userId, requesterID: userId, start_time}})
    .then((returnedPendingMeetings) =>{
      // setPendingMeetings(returnedPendingMeetings.data)
      onClose()
    })
    .catch(err=>{console.log('error deleting meeting ', err)})

  }

  return (
    <MeetingModalContainer>
      <MeetingModalContent>
        <h4>
          Your Scheduled Meetings on {dateString}
        </h4>
        <div>
          {meetingsOnDay.map(meeting => (
            <>
              <span>{meeting.first_name} {meeting.last_name} at {meeting.dateObj}   </span>
              <StyledButton style={{marginLeft: '5px'}} onClick={handleDelete(meeting.receiver_id, meeting.start_time)}>Delete</StyledButton>
            </>

          ))}
        </div>

        <StyledButton onClick={onClose}>Close</StyledButton>
      </MeetingModalContent>
    </MeetingModalContainer>
  )
}