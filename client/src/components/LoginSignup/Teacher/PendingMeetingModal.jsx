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

export default function PendingMeetingModal({ onClose, pendingMeetings, props }) {
  const [allPendingMeetings, setAllPendingMeetings] = useState(pendingMeetings)
  const [updatedPendingMeeting, setUpdatedPendingMeeting] = useState([])

  const acceptMeeting = (userId, start_time) => {
    axios.put(`${serverURL}/meetings`, {params: {receiverId: props.userId, requesterID: userId, start_time}})
    .then((returnedPendingMeetings) =>{
      setPendingMeetings(returnedPendingMeetings.data)
      onClose()
    })
    .catch(err=>{console.log('error accepting meeting ', err)})

  }

  const denyMeeting = (userId, start_time) => {
    axios.put(`${serverURL}/meetings/delete`, {params: {receiverId: props.userId, requesterID: userId, start_time}})
    .then((returnedPendingMeetings) =>{
      setPendingMeetings(returnedPendingMeetings.data)
      onClose()
    })
    .catch(err=>{console.log('error denying meeting ', err)})

  }
  useEffect(() => {
    var pendingMeetingsArray = []
    allPendingMeetings.forEach(meeting => {
      var dateObj = new Date(meeting.start_time)
      meeting.dateObj = dateObj.toLocaleTimeString();
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
          {updatedPendingMeeting.map(pending => (
            <>
              <span>{pending.first_name} {pending.last_name} at {pending.dateObj}</span> <br></br>
              <StyledButton onClick={acceptMeeting(pending.requester_id, pending.start_time)}>Accept</StyledButton>
              <StyledButton onClick={denyMeeting}>Deny</StyledButton>
            </>
          ))}
        </div>

        <StyledButton onClick={onClose}>Close</StyledButton>
      </MeetingModalContent>
    </MeetingModalContainer>
  )
}