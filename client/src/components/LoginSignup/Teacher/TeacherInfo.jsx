import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials = true;
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
} from '../../StyledComponents/StyledComponents.jsx';

import { serverURL } from '../../../config.js';

const StyledloginSignUpBox = styled.div`
  background-image: url("https://images.unsplash.com/photo-1619447093155-3d646f597c91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 35rem;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #383838;
  border: 2px solid #383838;
`
const TeacherLanguageLevel = styled.span`
  display: flex;
  flex-direction: column;
  label {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 25rem;
    label {
      justify-content: end;
    }
  }
`

export default function TeacherInfo ({handleCheck, handleChange, languages, teacherInfoSubmit }) {

  var languageList = languages.map(language => {
    return (
      <label  key={language.lang_id}>
        {language.lang_name}
        <input value={language.lang_name} type="checkbox" onChange={handleCheck} />
        <StyledLabel>
          Level:
          <StyledSelectInput name='english' onChange={handleChange} style={{height: '2rem', fontSize: '0.8rem', width: '4rem'}}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='AP'>AP</option>
          </StyledSelectInput>
        </StyledLabel>
      </label>
    )
  });

  return (
    <StyledloginSignUpBox style={{height: '50rem', width: '50rem'}}>
      <StyledLoginSignUpForm>
        <h1 style={{marginBottom: '-1rem', borderBottom: '1px solid #f5f5f5', paddingBottom: '1rem', width: '25rem', textAlign: 'center'}}>
        What do you teach?
        </h1>
          <StyledLabel style={{display: 'flex', flexDirection: 'column'}}>
            <TeacherLanguageLevel>
              {languageList}
            </TeacherLanguageLevel>
          </StyledLabel>
        <StyledRightAlignedForms>
        </StyledRightAlignedForms>
        <Link to="/teacherprofile">
          <StyledSubmitInput value='SUBMIT' onClick={teacherInfoSubmit}></StyledSubmitInput>
        </Link>
      </StyledLoginSignUpForm>
    </StyledloginSignUpBox>
  )
}