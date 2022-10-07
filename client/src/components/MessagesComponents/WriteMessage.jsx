import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { StyledSubmitInput } from '../StyledComponents/StyledComponents.jsx'
import SubmitMessage from './SubmitMessage.jsx'

export default function WriteMessage ({ handleChange, handleSubmit, inputValue }) {
  return (
    <>
      <textarea placeholder='write your message' onChange={handleChange} value={inputValue}>
      </textarea>
      <SubmitMessage handleSubmit={handleSubmit}/>
    </>
  )
}