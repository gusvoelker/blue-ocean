import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { StyledSubmitInput } from '../StyledComponents/StyledComponents.jsx'
import SubmitMessage from './SubmitMessage.jsx'

export default function WriteMessage ({ handleChange, handleSubmit }) {
  return (
    <>
      <textarea placeholder='write your message' onChange={handleChange}>
      </textarea>
      <SubmitMessage handleSubmit={handleSubmit}/>
    </>
  )
}