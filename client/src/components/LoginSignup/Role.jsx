import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  StyledSubmitInput,
  StyledTextInput,
  StyledSelectInput,
  StyledLogPage,
  StyledloginSignUpBox,
  StyledLoginSignUpForm,
  StyledLabel,
  StyledPageRow,
  StyledImage
} from '../StyledComponents/StyledComponents.jsx'

export default function Role () {
  const [formData, setFormData] = useState('')

  const handleChange = (e) => {
    e.preventDefault();
    setFormData(e.target.value);
    console.log(formData);
  }
  return (
    <StyledPageRow>
      <StyledloginSignUpBox style={{marginTop: '-10rem'}}>
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
          <StyledSubmitInput value='Select'></StyledSubmitInput>
        </StyledLoginSignUpForm>
      </StyledloginSignUpBox>
      <StyledImage style={{marginTop: '4rem'}} src="https://images.unsplash.com/photo-1557409518-691ebcd96038?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
    </StyledPageRow>
  )
}