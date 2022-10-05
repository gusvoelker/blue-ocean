import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import {
  ProfileCalendarInfo,
} from '../../StyledComponents/StyledComponents.jsx';
import './calendar.css'
import {serverURL} from '../../../config.js'
import axios from 'axios'
import Calendar from 'react-calendar'
import { differenceInCalendarDays } from 'date-fns';
import TeacherMeetingModal from './TeacherMeetingModal.jsx'


export default function TeacherCalendar({ props, meetings }) {
  const [value, onChange] = useState(new Date());
  const datesToAddContentTo = [new Date()];
  const [open, setOpen] = useState(false)

  function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === 0;
  }

function tileContent({ date, view }) {
  // Add class to tiles in month view only
  if (view === 'month') {
    // Check if a date React-Calendar wants to check is on the list of dates to add class to
    if (datesToAddContentTo.find(dDate => isSameDay(dDate, date))) {
      return (
        <div style={{padding:'2px 2px'}} onClick={()=>{setOpen(true)}}></div>
      );
    }
  }
}
  useEffect(()=>{

  }, [])

  return (

    <ProfileCalendarInfo>
      <Calendar onChange={onChange} value={value} tileContent={tileContent}/>
      {open && <TeacherMeetingModal onClose={()=>{setOpen(false)}}open={open} meetings={meetings} day={value}/>}
    </ProfileCalendarInfo>


  )
}