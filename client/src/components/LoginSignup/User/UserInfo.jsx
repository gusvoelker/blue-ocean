import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  StyledButton,
  StyledLogPage,
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
import axios from 'axios';
import { serverURL } from '../../../config.js';

const StyledloginSignUpBox = styled.div`
  background-image: url("https://images.unsplash.com/photo-1536683402757-75f8d0dfa419?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 45rem;
  height: 55rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #383838;
  border: 2px solid #383838;
`

export default function UserInfo ({handleCheck, handleChange, languages, setLanguages }) {
  // const [formData, setFormData] = useState({
  //   primary: '',
  //   tolearn: '',
  //   videochat: ''
  // })
  // const [checked, setChecked] = useState([]);

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   })
  //   console.log(e.target.value);
  // }

  // const handleCheck = (event) => {
  //   var updatedList = [...checked];
  //   if (event.target.checked) {
  //     updatedList = [...checked, event.target.value];
  //   } else {
  //     updatedList.splice(checked.indexOf(event.target.value), 1);
  //   }
  //   setChecked(updatedList);
  //   console.log(checked);
  // };

  useEffect(() => {
    axios.get(`${serverURL}/languages`)
      .then((data) => {
        var apiLanguages = data.data
        setLanguages(apiLanguages);
        console.log(apiLanguages);
      }).catch((err) => {
        console.log('err: ', err)
      })
  }, [])

  const languageList = languages.map((language) => {
    return (
      <option value={language.lang_name} key={language.lang_id}>{language.lang_name}</option>
    )
  })

  const languageProficiencies = languages.map((language) => {
    return (
      <label key={language.lang_id}>
        {language.lang_name}:
        <input value={language.lang_name} type="checkbox" onChange={handleCheck} />
      </label>
    )
  })

  return (
      <StyledloginSignUpBox>
        <StyledLoginSignUpForm>
          <h1>
          Tell us a little about yourself
          </h1>
          <StyledRightAlignedForms>
            <StyledLabel>
              What is your primary language?
              <StyledSelectInput onChange={handleChange} name='primary'>
                {languageList}
              </StyledSelectInput>
            </StyledLabel>
            <StyledLabel>
              What language would you like to learn?
              <StyledSelectInput onChange={handleChange} name='tolearn'>
                {languageList}
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
              {languageProficiencies}
            </span>
          </StyledLabel>
          <StyledSubmitInput value='SUBMIT'></StyledSubmitInput>
          <StyledSubmitInput value='SKIP'></StyledSubmitInput>
        </StyledLoginSignUpForm>
      </StyledloginSignUpBox>
  )
}