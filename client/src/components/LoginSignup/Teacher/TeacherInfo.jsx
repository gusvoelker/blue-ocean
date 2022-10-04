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
} from '../../StyledComponents/StyledComponents.jsx';

import { Outlet, Link } from "react-router-dom";

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

export default function TeacherInfo ({handleCheck, handleChange}) {
  // const [formData, setFormData] = useState({
  //   level: '',
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

  return (
    <StyledloginSignUpBox style={{height: '50rem', width: '50rem'}}>
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
        <Link to="/teacherprofile">
          <StyledSubmitInput value='SUBMIT'></StyledSubmitInput>
        </Link>
        <Link to="/teacherprofile">
          <StyledSubmitInput value='SKIP'></StyledSubmitInput>
        </Link>
      </StyledLoginSignUpForm>
    </StyledloginSignUpBox>
  )
}