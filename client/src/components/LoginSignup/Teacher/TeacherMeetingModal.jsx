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

export default function TeacherMeetingModal({ onClose, open, meetingsOnDay, day, teacherId }) {
  console.log('day in modal ', typeof day, day)
  var dateString = day.toLocaleDateString()

  const handleDelete = (e, receiverId, requesterId, start_time) => {
    e.preventDefault()
    var start_time = new Date(start_time)
    var GMTTime = start_time.toUTCString()
    console.log('GMT time teacher meeting modal', GMTTime)
    axios.delete(`${serverURL}/meetings`, {params: {receiverId: receiverId, requesterID: requesterId, dateTime: GMTTime}})
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
          {meetingsOnDay.map((meeting, index )=> (
            <div key={index}>
              {meeting.status ? <span>{meeting.first_name} {meeting.last_name} at {meeting.dateObj}   </span> : <span>{meeting.first_name} {meeting.last_name} at {meeting.dateObj} (pending)  </span>}
              <StyledButton style={{marginLeft: '5px'}} onClick={(e)=>handleDelete(e, meeting.rec_account_id, meeting.req_account_id, meeting.start_time)}>Delete</StyledButton>
            </div>

          ))}
        </div>

        <StyledButton onClick={onClose}>Close</StyledButton>
      </MeetingModalContent>
    </MeetingModalContainer>
  )
}