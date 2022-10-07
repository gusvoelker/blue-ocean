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


export default function TeacherCalendar({ teacherId, meetings, handleDelete }) {
  const [value, onChange] = useState(new Date());
  const [open, setOpen] = useState(false)
  const [meetingsOnDay, setMeetingsOnDay] = useState(null)
  const [daysToHighlight, setDaysToHighlight] = useState([])
  const [allMeetings, setAllMeetings] = useState(meetings)

  function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === 0;
  }

  const onCalendarClick = () => {
      setOpen(true)
  }

  useEffect(()=>{
    var meetingsOnDayArray = []
    console.log('value Effect', value)
    meetings.forEach(meeting => {
      var dateObj = new Date(meeting.start_time)
      dateObj.setHours(dateObj.getHours()-4)
      if (isSameDay(dateObj, value)) {
        meeting.dateObj = dateObj.toLocaleDateString();
        meeting.timeObj = dateObj.toLocaleTimeString();
        meetingsOnDayArray.push(meeting)
      }
    })
    console.log('meetingsOnDay Effect', meetingsOnDayArray)
    setMeetingsOnDay(meetingsOnDayArray)

  }, [value])


  useEffect(()=>{
    var highlight = []
    meetings.forEach(meeting =>{
      var dateObj = new Date(meeting.start_time)
      dateObj.setHours(dateObj.getHours()-4)
      highlight.push(dateObj)
    })
    console.log('days to highlight ', highlight)
    console.log('meetings ', meetings)
    setDaysToHighlight(highlight)
  }, [meetings])

  return (
    <>
     {daysToHighlight && <Calendar onChange={onChange} onClickDay={onCalendarClick} value={value} tileClassName={({date, view}) => {
        for (var i=0; i<daysToHighlight.length; i++) {
          if (isSameDay(daysToHighlight[i], date)) {
            return 'highlight'
          }
        }
      }}/>}
      {(open && meetingsOnDay) && <TeacherMeetingModal onClose={() => { setOpen(false) }} open={open} meetingsOnDay={meetingsOnDay} day={value} teacherId={teacherId} handleDelete={handleDelete}/>}

    </>



  )
}