import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  StyledButton,
  StyledLogPage,
  StyledloginSignUpBox,
  StyledLoginSignUpForm,
  StyledLabel,
  StyledTextEmail,
  StyledTextInput,
  StyledRightAlignedForms,
  StyledSubmitInput,
  StyledSelectInput,
  StyledRadioInput
} from '../../StyledComponents/StyledComponents.jsx'

export default function UserInfo () {
  const [formData, setFormData] = useState({
    primary: '',
    tolearn: '',
    videochat: ''
  })
  const [checked, setChecked] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log(e.target.value);
  }

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    console.log(checked);
  };

  return (
    <StyledloginSignUpBox style={{height: '50rem', width: '50rem', marginTop: '15rem', marginBottom: '5rem'}}>
      <StyledLoginSignUpForm>
        <h1>
        Tell us a little about yourself
        </h1>
        <StyledRightAlignedForms>
          <StyledLabel>
            What is your primary language?
            <StyledSelectInput onChange={handleChange} name='primary'>
              <option value='english'>English</option>
              <option value='spanish'>Spanish</option>
              <option value='romanian'>Romanian</option>
              <option value='french'>French</option>
              <option value='latin'>Latin</option>
              <option value='greek'>Greek</option>
              <option value='portuguese'>Portuguese</option>
              <option value='elvish'>Elvish</option>
            </StyledSelectInput>
          </StyledLabel>
          <StyledLabel>
            What language would you like to learn?
            <StyledSelectInput onChange={handleChange} name='tolearn' value='spanish'>
              <option value='english'>English</option>
              <option value='spanish'>Spanish</option>
              <option value='romanian'>Romanian</option>
              <option value='french'>French</option>
              <option value='latin'>Latin</option>
              <option value='greek'>Greek</option>
              <option value='portuguese'>Portuguese</option>
              <option value='elvish'>Elvish</option>
            </StyledSelectInput>
          </StyledLabel>
          <StyledLabel>
            Do you want to enable voice chat?
            <StyledSelectInput onChange={handleChange} name='videochat'>
              <option value='yes'>yes</option>
              <option value='no'>no</option>
            </StyledSelectInput>
          </StyledLabel>
        </StyledRightAlignedForms>
        <StyledLabel style={{display: 'flex', justifyContent: 'right', alignItems: 'right', flexDirection: 'column'}}>
          <p>
            Do you have any other language profficiencies?
          </p>
          <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <label>
              English:
              <input value='english' type="checkbox" onChange={handleCheck} />
            </label>
            <label>
              Spanish:
              <input value='spanish' type="checkbox" onChange={handleCheck} />
            </label>
            <label>
              Romanian:
              <input value='romanian' type="checkbox" onChange={handleCheck} />
            </label>
            <label>
              French:
              <input value='french' type="checkbox" onChange={handleCheck} />
            </label>
            <label>
              Portuguese:
              <input value='portuguese' type="checkbox" onChange={handleCheck} />
            </label>
            <label>
              Latin:
              <input value='Latin' type="checkbox" onChange={handleCheck} />
            </label>
            <label>
              Greek:
              <input value='greek' type="checkbox" onChange={handleCheck} />
            </label>
          </span>
        </StyledLabel>
        <StyledSubmitInput value='SUBMIT'></StyledSubmitInput>
      </StyledLoginSignUpForm>
    </StyledloginSignUpBox>
  )
}