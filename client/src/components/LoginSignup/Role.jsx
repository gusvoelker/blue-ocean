import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  StyledSubmitInput,
  StyledTextInput,
  StyledSelectInput,
  StyledLogPage,
  StyledloginSignUpBox,
  StyledLoginSignUpForm,
  StyledLabel
} from '../StyledComponents/StyledComponents.jsx'

export default function Role () {
  const [formData, setFormData] = useState('teacher')

  const handleChange = (e) => {
    e.preventDefault();
    setFormData(e.target.value);
    console.log(formData);
  }
  return (
    <StyledloginSignUpBox>
      <StyledLoginSignUpForm>
        <h1>
          CHOOSE A ROLE
        </h1>
        <StyledLabel>
          <StyledSelectInput onChange={handleChange}>
            <option value='teacher'>Teacher</option>
            <option value='user'>User</option>
          </StyledSelectInput>
        </StyledLabel>
        <StyledSubmitInput value='SELECT'></StyledSubmitInput>
      </StyledLoginSignUpForm>
    </StyledloginSignUpBox>
  )
}