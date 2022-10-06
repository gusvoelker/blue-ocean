import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import {
  ProfileCalendarInfo,
  StyledButton
} from '../../StyledComponents/StyledComponents.jsx';
import './calendar.css'
import { serverURL } from '../../../config.js'
import axios from 'axios'
import Calendar from 'react-calendar'
import { differenceInCalendarDays } from 'date-fns';
import TeacherMeetingModal from './TeacherMeetingModal.jsx'


export default function TeacherCalendar({ props, meetings }) {
  const [value, onChange] = useState(new Date());
  const datesToAddContentTo = [new Date('Wed, 05 Oct 2022 20:34:12 GMT')];
  const [open, setOpen] = useState(false)
  const [meetingsOnDay, setMeetingsOnDay] = useState([])
  const [daysToHighlight, setDaysToHighlight] = useState([])
  const [calendarClickedDay, setCalendarClickedDay] = useState({})

  function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === 0;
  }

  const onCalendarClick = () => {
    console.log('click', value)
    setOpen(true)
    setCalendarClickedDay(value)
    var meetingsOnDayArray = []
    meetings.forEach(meeting => {
      var dateObj = new Date(meeting.start_time)
      if (isSameDay(dateObj, value)) {
        meeting.dateObj = dateObj.toLocaleTimeString();
        meetingsOnDayArray.push(meeting)
      }

    })
    setMeetingsOnDay(meetingsOnDayArray)

  }

  useEffect(()=>{
    var highlight = []
    meetings.forEach(meeting =>{
      var dateObj = new Date(meeting.start_time)
      highlight.push(dateObj)
    })
    setDaysToHighlight(highlight)
  }, [])

  return (
    <>
      <Calendar onChange={onChange} onClickDay={onCalendarClick} value={value} tileClassName={({date, view}) => {
        for (var i=0; i<daysToHighlight.length; i++) {
          if (isSameDay(daysToHighlight[i], date)) {
            return 'highlight'
          }
        }
      }}/>
      {open && <TeacherMeetingModal onClose={() => { setOpen(false) }} open={open} meetingsOnDay={meetingsOnDay} day={value} props={props}/>}

    </>



  )
}