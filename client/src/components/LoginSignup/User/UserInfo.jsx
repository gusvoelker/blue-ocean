import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials = true;
import { serverURL } from '../../../config.js';
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

export default function UserInfo ({ handleCheck, handleChange, languages }) {

  if (languages.length === 0) {
    return null;
  }

  const [knownLanguageId, setKnownLanguageId] = useState(languages[0].lang_id);
  const [desiredLanguageId, setDesiredLanguageId] = useState(languages[0].lang_id);

  const submitLanguages = () => {
    axios.post(`${serverURL}/languages/known`, {
      langId: knownLanguageId
    })
      .catch((error) => console.log(error));
    axios.post(`${serverURL}/languages/desired`, {
      langId: desiredLanguageId
    })
      .catch((error) => console.log(error));
  };

  const languageList = languages.map((language) => {
    return (
      <option value={language.lang_id} key={language.lang_id}>{language.lang_name}</option>
    )
  });

  const languageProficiencies = languages.map((language) => {
    return (
      <label key={language.lang_id}>
        {language.lang_name}:
        <input value={language.lang_id} type="checkbox" onChange={handleCheck} />
      </label>
    )
  });

  return (
      <StyledloginSignUpBox>
        <StyledLoginSignUpForm>
          <h1>
          Tell us a little about yourself
          </h1>
          <StyledRightAlignedForms>
            <StyledLabel>
              What is your primary language?
              <StyledSelectInput onChange={(e) => setKnownLanguageId(e.target.value)} name='lang-known'>
                {languageList}
              </StyledSelectInput>
            </StyledLabel>
            <StyledLabel>
              What language would you like to learn?
              <StyledSelectInput onChange={(e) => setDesiredLanguageId(e.target.value)} name='lang-learn'>
                {languageList}
              </StyledSelectInput>
            </StyledLabel>
            <StyledLabel>
              {/* TODO: Remove this if it does nothing */}
              Do you want to enable voice chat?
              <StyledSelectInput onChange={handleChange} name='videochat'>
                <option value={true}>yes</option>
                <option value={false}>no</option>
              </StyledSelectInput>
            </StyledLabel>
          </StyledRightAlignedForms>
          <Link to="/profile">
            <StyledSubmitInput value='SUBMIT' onClick={submitLanguages}></StyledSubmitInput>
          </Link>
        </StyledLoginSignUpForm>
      </StyledloginSignUpBox>
  )
}