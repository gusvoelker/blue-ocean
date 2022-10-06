import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  MeetingModalContainer,
  MeetingModalContent,
  ClassListModalContent,
  LightGreyButton,
  StyledButton,
} from '../../StyledComponents/StyledComponents.jsx';
import {serverURL} from '../../../config.js'
import axios from 'axios'

export default function PendingMeetingModal({ onClose, pendingMeetings, teacherId, acceptMeeting, denyMeeting }) {
  const [allPendingMeetings, setAllPendingMeetings] = useState(pendingMeetings)
  const [updatedPendingMeeting, setUpdatedPendingMeeting] = useState(null)


  useEffect(() => {
    var pendingMeetingsArray = []
    allPendingMeetings.forEach(meeting => {
      var dateObj = new Date(meeting.start_time)
      meeting.timeObj = dateObj.toLocaleTimeString();
      meeting.dateObj = dateObj.toLocaleDateString();
      pendingMeetingsArray.push(meeting)
    })
    setUpdatedPendingMeeting(pendingMeetingsArray)
  }, [allPendingMeetings])

  return (
    <MeetingModalContainer>
      <MeetingModalContent>
        <h4>
          Your Pending Meeting Requests
        </h4>
        <div>
          {updatedPendingMeeting && updatedPendingMeeting.map((pending, index) => (
            <div key={index}>
              <span>{pending.first_name} {pending.last_name} on {pending.dateObj} at {pending.timeObj}</span> <br></br>
              <StyledButton onClick={(e)=>{
                acceptMeeting(e, pending.req_account_id, pending.rec_account_id, pending.start_time);
                onClose();
                }}>Accept</StyledButton>
              <StyledButton onClick={(e)=>{
                denyMeeting(e, pending.req_account_id, pending.rec_account_id, pending.start_time);
                onClose();
                }}>Deny</StyledButton>
            </div>
          ))}
        </div>

        <StyledButton onClick={onClose}>Close</StyledButton>
      </MeetingModalContent>
    </MeetingModalContainer>
  )
}