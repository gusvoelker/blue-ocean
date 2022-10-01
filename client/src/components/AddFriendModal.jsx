import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  FriendsModalContainer,
  FriendsModalContent,
  LightGreyButton,
} from './StyledComponents/StyledComponents.jsx';

export default function AddFriendModal (props) {
  if (!props.show) {
    return null;
  }

  return (
    <FriendsModalContainer>
      <FriendsModalContent>
        <h4>
          ADD FRIEND
        </h4>
        <input type="text"></input>
        <LightGreyButton onClick={props.onClose}>Close</LightGreyButton>
      </FriendsModalContent>
    </FriendsModalContainer>
  )
}