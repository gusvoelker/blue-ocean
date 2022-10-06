import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import {
  CSVModalContainer,
  CSVModalContent,
  LightGreyButton,
  StyledCSVCloseButton,
  StyledClassTextInput,
  StyledSpinner,
  StyledCSVButton,
  StyledSpan,
  StyledButtonDiv,
} from '../../StyledComponents/StyledComponents.jsx';
import exampleCSVPic from './exampleCSVPic.png'
import axios from 'axios';
import { serverURL } from '../../../config.js'



export default function TeacherClassListModal({ teacherId, onClose, show, getClasses }) {
  //state for controlling whether loading spinner is visible
  const [spinner, setSpinner] = useState(false)
  const [className, setClassName] = useState('')
  const hiddenFileInput = useRef(null);

  if (!show) {
    return null;
  }

  const handleChange = (e) => {
    e.preventDefault();
    setClassName(e.target.value)
    console.log(e.target.value);
  }

  const handleFileClick = e => {
    console.log('in handleFileClick userId', teacherId)
    hiddenFileInput.current.click();
  }

  const onFileInput = (e) => {
    var file = e.target.files[0]
    console.log('file received')
    //Have a spinner graphic so teachers know the file is loading
    setSpinner(true)
    var options = {
      url: `${serverURL}/classes`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        className: className,
        teacher_id: teacherId,
      },
    }
    axios(options).then(response => {
      console.log('response from first query ', response)
      var class_id = response.data.class_id
      const formData = new FormData();
      formData.append('file', file)
      axios.post(`${serverURL}/classes/students/${class_id}`, formData, {
        headers: {
          'Content-Type': 'mulitpart/form-data'
        }
      })
        .then(() => {
          console.log('response from second query')
          getClasses()
          setSpinner(false);
        })
        .catch((err) => {
          setSpinner(false)
          console.log(err)
        })

    }).catch(err => { setSpinner(false); console.log(err) })
  }

  return (
    <CSVModalContainer>
      <CSVModalContent>

        <StyledClassTextInput placeholder='enter class name here' name='class' onChange={handleChange} required></StyledClassTextInput>

        <img src={exampleCSVPic} alt="Example .csv file with three columns: First Name, Last Name, Email" style={{ margin: '1rem' }} />
        <StyledSpan>Please upload a .csv file of your class list with the following columns: First Name, Last Name, Email. </StyledSpan>
        <StyledButtonDiv>
          <StyledCSVButton style={{ marginTop: '2rem' }} onClick={handleFileClick}>
            {spinner && <StyledSpinner viewBox="0 0 50 50">
              <circle
                className="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="2"
              />
            </StyledSpinner>}
            ADD .CSV
            <input hidden type='file' name="currentCSVFile" onChange={onFileInput} ref={hiddenFileInput}></input>
          </StyledCSVButton>


          <StyledCSVCloseButton onClick={onClose} style={{ marginright: '2rem' }}>CLOSE</StyledCSVCloseButton>

        </StyledButtonDiv>

      </CSVModalContent>
    </CSVModalContainer>
  )
}