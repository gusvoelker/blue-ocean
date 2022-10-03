import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  StyledSubmitInput,
  StyledTextInput,
  StyledSelectInput,
  StyledLogPage,
  StyledLoginSignUpForm,
  StyledLabel,
  StyledPageRow,
  StyledImage
} from '../StyledComponents/StyledComponents.jsx'

const StyledloginSignUpBox = styled.div`
  background-image: url("https://images.unsplash.com/photo-1557409518-691ebcd96038?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
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


export default function Role () {
  const [formData, setFormData] = useState('')

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
          <StyledSubmitInput value='Select'></StyledSubmitInput>
        </StyledLoginSignUpForm>
      </StyledloginSignUpBox>
  )
}