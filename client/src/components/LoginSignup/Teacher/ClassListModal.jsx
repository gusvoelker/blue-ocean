import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  ClassListModalContainer,
  ClassListModalContent,
  LightGreyButton,
  StyledButton,
} from '../../StyledComponents/StyledComponents.jsx';

export default function ClassListModal({ onClose, classShow, modalClassName, students }) {


  return (
    <ClassListModalContainer>
      <ClassListModalContent>
      <h3 style={{marginTop: '-0.5rem'}}><strong>Students in {modalClassName}</strong></h3>


        <div style={{ marginBottom: "10px" }}>
          {students.map(student => (
            <>
              <span>{student.first_name} {student.last_name}</span><br></br>
            </>
          ))}
        </div>

        <StyledButton onClick={onClose}>Close</StyledButton>
      </ClassListModalContent>
    </ClassListModalContainer>
  )
}