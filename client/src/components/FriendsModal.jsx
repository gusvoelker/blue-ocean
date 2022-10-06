import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';
import {serverURL} from '../config.js';
import {
  FriendsModalContainer,
  FriendsModalContent,
  LightGreyButton,
  StyledButton,
  FriendsModalInfoLine,
  StyledSelectInput
} from './StyledComponents/StyledComponents.jsx';

export default function FriendsModal (props) {
  if (!props.show) {
    return null;
  }
  var [rating, setRating] = useState(4);
  var [desiredLanguages, setDesiredLanguages] = useState([])
  var [ratedLanguage, setRatedLanguage] = useState(0)

  const handleRange = (e) => {
    setRating(parseInt(e.target.value));
    console.log(e.target.value)
  }

  useEffect(() => {
    // when students have languages,
    axios.get(`${serverURL}/languages/desired`, {
      params: {
        accountId: props.friend.account_id
      }
    }).then((data) => {
      setDesiredLanguages(data.data);
    }).catch((err) => {
      console.log(err);
    })
  })
  const handleRate = (e) => {
    axios.post(`${serverURL}/ratings`, {
        accountId: props.friend.account_id,
        languageId: parseInt(ratedLanguage),
        rating: rating,
    }).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    })
  }

  const languageSelect = desiredLanguages.map(language => {
    return (
      <option value={language.lang_id} id={language.lang_id} key={language.lang_id} style={{color: '#383838'}}>{language.lang_name}</option>
    )
  })

  const handleSelect = (e) => {
    console.log(e.target.value);
    setRatedLanguage(parseInt(e.target.value));
    console.log(ratedLanguage);
  }

  return (
    <FriendsModalContainer>
      <FriendsModalContent>
        <h4>
          {props.friend.first_name + ' ' + props.friend.last_name}
        </h4>
        <input onChange={handleRange} type="range" id="volume" name="volume"
          min="1" max="4"/><br></br>
        <label for="volume">Rate their language proficiency in:</label><br></br>
        <StyledSelectInput onChange={handleSelect} style={{color: '#383838', marginTop: '1rem'}}>
          {languageSelect}
        </StyledSelectInput>
        <br></br>
        <h2>{rating}</h2>
        <StyledButton onClick={props.onClose} style={{margin: '1rem'}}>CLOSE</StyledButton>
        <StyledButton onClick={handleRate} style={{margin: '1rem'}}>RATE</StyledButton>
      </FriendsModalContent>
    </FriendsModalContainer>
  )
}