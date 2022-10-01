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
  StyledRadioInput,
  StyledPageRow,
  StyledImage
} from '../../StyledComponents/StyledComponents.jsx'

export default function TeacherInfo () {
  const [formData, setFormData] = useState({
    level: '',
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
    <StyledPageRow style={{marginTop: '4rem', marginBottom: '4rem'}}>
      <StyledImage style={{marginRight: '-8rem', marginTop: '-40rem'}} src="https://images.unsplash.com/photo-1557409518-691ebcd96038?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
    <StyledloginSignUpBox style={{height: '50rem', width: '50rem', marginTop: '10rem', marginBottom: '5rem', marginLeft: '-8rem'}}>
      <StyledLoginSignUpForm>
        <h1>
        Tell us a little about yourself
        </h1>
          <StyledLabel style={{display: 'flex', justifyContent: 'center', alignItems: 'cener', flexDirection: 'column'}}>
            <p>
              What languages can you teach?
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
          <StyledLabel>
            What level can you teach at?
            <StyledSelectInput onChange={handleChange} name='level'>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='AP'>AP</option>
            </StyledSelectInput>
          </StyledLabel>
        <StyledRightAlignedForms>
        </StyledRightAlignedForms>
        <StyledSubmitInput value='SUBMIT'></StyledSubmitInput>
        <StyledSubmitInput value='SKIP'></StyledSubmitInput>
      </StyledLoginSignUpForm>
    </StyledloginSignUpBox>
    </StyledPageRow>
  )
}