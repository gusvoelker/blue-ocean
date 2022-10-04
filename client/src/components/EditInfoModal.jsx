import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  FriendsModalContainer,
  FriendsModalContent,
  LightGreyButton,
  StyledButton
} from './StyledComponents/StyledComponents.jsx';

export default function EditInfoModal (props) {
  if (!props.show) {
    return null;
  }

  return (
    <FriendsModalContainer>
      <FriendsModalContent>
        <h4>
          Edit Info
        </h4>
        <div>
          Random Content
        </div>
        <br></br>
        <StyledButton onClick={props.onClose}>Close</StyledButton>
      </FriendsModalContent>
    </FriendsModalContainer>
  )
}