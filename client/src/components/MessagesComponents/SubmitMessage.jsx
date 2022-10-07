import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { StyledSubmitInput } from '../StyledComponents/StyledComponents.jsx';

export default function SubmitMessage ({ handleSubmit }) {
  return (
    <>
      <StyledSubmitInput style={{width: '10rem', border: '1px solid #383838'}} value='Send' onClick={handleSubmit} />
    </>
  )
}