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

export default function PendingMeetingModal({ onClose, pendingMeetings, teacherId }) {
  const [allPendingMeetings, setAllPendingMeetings] = useState(pendingMeetings)
  const [updatedPendingMeeting, setUpdatedPendingMeeting] = useState([])

  const acceptMeeting = (e, requesterId, receiverId, start_time) => {
    e.preventDefault()
    onClose()
    var start_time = new Date(start_time)
    var GMTtime = start_time.toUTCString()
    axios.put(`${serverURL}/meetings`, {receiverId: receiverId, requesterId: requesterId, dateTime: GMTtime})
    .then((returnedPendingMeetings) =>{
      // setPendingMeetings(returnedPendingMeetings.data)

    })
    .catch(err=>{console.log('error accepting meeting ', err)})

  }

  const denyMeeting = (e, requesterId, receiverId,  start_time) => {
    e.preventDefault()
    onClose()
    var start_time = new Date(start_time)
    var GMTtime = start_time.toUTCString()
    axios.delete(`${serverURL}/meetings`, {params: {receiverId: receiverId, requesterId: requesterId, dateTime: GMTtime}})
    .then((returnedPendingMeetings) =>{
      // setPendingMeetings(returnedPendingMeetings.data)

    })
    .catch(err=>{console.log('error denying meeting ', err)})

  }
  useEffect(() => {
    var pendingMeetingsArray = []
    allPendingMeetings.forEach(meeting => {
      var dateObj = new Date(meeting.start_time)
      meeting.timeObj = dateObj.toLocaleTimeString();
      meeting.dateObj = dateObj.toLocaleDateString();
      pendingMeetingsArray.push(meeting)
    })
    console.log('pending meetings ', pendingMeetingsArray)
    setUpdatedPendingMeeting(pendingMeetingsArray)
  }, [allPendingMeetings])

  return (
    <MeetingModalContainer>
      <MeetingModalContent>
        <h4>
          Your Pending Meeting Requests
        </h4>
        <div>
          {updatedPendingMeeting.map((pending, index) => (
            <div key={index}>
              <span>{pending.first_name} {pending.last_name} on {pending.dateObj} at {pending.timeObj}</span> <br></br>
              <StyledButton onClick={(e)=>{acceptMeeting(e, pending.req_account_id, pending.rec_account_id, pending.start_time)}}>Accept</StyledButton>
              <StyledButton onClick={(e)=>{denyMeeting(e, pending.req_account_id, pending.rec_account_id, pending.start_time)}}>Deny</StyledButton>
            </div>
          ))}
        </div>

        <StyledButton onClick={onClose}>Close</StyledButton>
      </MeetingModalContent>
    </MeetingModalContainer>
  )
}