import styled from 'styled-components';

// complementary color of our blue - 	#383838
// triadic colors 	#8F386A, #6A8F38

const StyledNavBar = styled.div`
  background-image: url("https://images.unsplash.com/photo-1595364237783-18144c05cd79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 7rem;
  position: absolute;
  top: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  box-shadow: 0px 5px 5px #383838;
`

const StyledNavBarIcon = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  color: #f5f5f5;
  margin: 1rem;
  font-family: 'Dancing Script', cursive;
`

const StyledNavBarLinks = styled.h2`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  padding: 1rem;
  font-size: 2rem;
  color: #f5f5f5;
  position: absolute;
  right: 0;
  margin-right: 3rem;
  cursor: pointer;
  transition: 0.3s;
  p{
    transition: 0.3s;
    &:hover {
      color: #e7afd0;
    }
  }
`

const ProfileContainer = styled.div`
  position: absolute;
  top: 15%;
  width: 80vw;
  right: 10%;
  height: 800px;
`
const ProfilePicture = styled.img`
  position: absolute;
  top: 7%;
  left: -10%;
  border-radius: 50%;
  height: 285px;
  width: 285px;
  object-fit: cover;
`
const ProfileBackground = styled.img`
  top: 0%;
  width: 80vw;
  height: 300px;
  border-radius: 15px;
  object-fit: cover;
`
const ProfileAccountInfo = styled.div`
  position: absolute;
  bottom: 0%;
  width: 20vw;
  height: 400px;
  border-radius: 15px;
  background-color: #d3d3d3;
  left: 0%;
  text-align: center;
  justify-content: center;
  padding: 10px;
  h3{
    padding: 25px;
    font-size: 20px;
  };
  div{
    padding:10px;
  };
`
const ProfileFriendsList = styled.div`
  position: absolute;
  bottom: 0%;
  width: 25vw;
  height: 450px;
  border-radius: 15px;
  background-color: #a9a9a9;
  left: 30.25%;
  padding: 10px;
  text-align: center;
  justify-content: center;
  h3{
    padding: 20px;
    font-size: 20px;
  };
  p{
    padding: 5px;
    background-color: #d3d3d3;
    border-radius: 15px;
    height: 250px;
    overflow: auto;
    &::-webkit-scrollbar {
    width: 0px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #9e9e9e;
      border-radius: 4px;
    }
    };
  div{
    padding:10px;
  };
`
const ProfileChatContainer = styled(ProfileFriendsList)`
  left: 66.5%;
`
const MessagesConvoContainer = styled.div`
  position: absolute;
  top: 15%;
  width: 20vw;
  left: 10%;
  height: 775px;
  background-color: #d3d3d3;
  border-radius: 15px;
  text-align: center;
  padding: 25px;
  p{
    font-size:25px;
    padding: 15px;
  }
  button{
    background-color: white;
    width: 18vw;
    border-radius:5px;
    text-align: left;
  }
`
const MessagesChatContainer = styled.div`
  position: absolute;
  top: 15%;
  width: 48vw;
  left: 38%;
  height: 775px;
  background-color: #d3d3d3;
  border-radius: 15px;
  text-align: center;
  padding: 25px;
  input{
    position: relative;
    width: 48vw;
    top: 95%;
    border-radius: 10px;
    border: none;
    height: 40px;
    font-size: 20px;
    background-color: #90EE90;
    box-shadow: 1px 1px #808080;
    &:focus {
      border: none;
    };
  }
`
const MessagesTopContainer = styled.div`
  position: absolute;
  background-color: white;
  height: 15px;
  width: 46.5vw;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  img {
    position: absolute;
    left: -3%;
    top: -35%;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
`
const MessagesTextContainer = styled.div`
  display: flex;
  position: absolute;
  top: 8%;
  left: 4%;
  width: 44vw;
  height: 630px;
  background-color: white;
  border-radius: 15px;
  text-align: center;
  padding: 25px;
  overflow: hidden;
  flex-direction: column-reverse;
`
const MyMessage = styled.div`
  width: auto;
  text-align: left;
  background-color: #e5e4e2;
  border-radius: 10px;
  height: auto;
  padding: 5px;
  margin-top: 15px;
  overflow: auto;
  img {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    float: right;
  }
`

const TheirMessage = styled(MyMessage)`
  background-color: #C0C0C0;
  img {
    border-radius: 50%;
    object-fit: cover;
    float: left;
    margin-right: 10px;
  }
`
const LightGreyButton = styled.button`
  background-color: #d3d3d3;
  border-radius: 10px;
  color: black;
  padding: 15px 32px;
  border: 1px solid grey;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  width: 22vw;
  margin-top: 20px;
  &:hover {
      color: white;
      background-color: grey;
    }
`

const StyledSubmitInput = styled.input.attrs({ type: 'submit' })`
  width: 8em;
  height: 3rem;
  font-size: 1.2rem;
  background-color: #f5f5f5;
  padding: .5rem;
  border-radius: 50px;
  color: #386A8F;
  box-shadow: 5px 5px 5px #383838;
  border: 1px solid #383838;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px 5px #383838;
    color: #f5f5f5;
    background-color: #386A8F;
  }
`

const StyledTextInput = styled.input.attrs({ type: 'text' })`
  width: 15;
  font-size: 1rem;
  padding: 0.3rem;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #383838;
  border: 1px solid #383838;
`

const StyledTextEmail = styled.input.attrs({ type: 'email' })`
  width: 15;
  font-size: 1rem;
  padding: 0.3rem;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #383838;
  border: 1px solid #383838;
`

const StyledRadioInput = styled.input.attrs({ type: 'radio' })`
`

const StyledSelectInput = styled.select`
  width: 10rem;
  padding: .5rem;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #383838;
  border: 1px solid #383838;
  height: 3rem;
  color: #386A8F;
  font-size: 1.2rem;
  option {
    padding: 0.5rem;
    color: #386A8F;
  }
`

const StyledButton = styled.button`
  width: 8em;
  height: 3rem;
  font-size: 1rem;
  background-color: #f5f5f5;
  padding: .5rem;
  border-radius: 50px;
  color: #386A8F;
  box-shadow: 5px 5px 5px #383838;
  border: 1px solid #383838;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px 5px #383838;
    color: #f5f5f5;
    background-color: #386A8F;
  }
`

const StyledloginSignUpBox = styled.div`
  background-image: url("https://images.unsplash.com/photo-1607893351349-0cfa621476ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-top: 4rem;
  width: 35rem;
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #383838;
  border: 2px solid #383838;
  color: #f5f5f5;
`

const StyledLoginSignUpForm = styled.form`
  background-color: #383838;
  border-radius: 20px;
  padding: 1rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #f5f5f5;
`

const StyledLogPage = styled.div`
  width: 90vw;
  min-height: 90vh;
  height: auto;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f5f5f5;
`

const StyledLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1.3rem;
`

const StyledRightAlignedForms = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  gap: 1rem;
`


export {
  StyledNavBar,
  StyledNavBarIcon,
  StyledNavBarLinks,
  ProfileContainer,
  ProfilePicture,
  ProfileBackground,
  ProfileAccountInfo,
  ProfileFriendsList,
  ProfileChatContainer,
  LightGreyButton,
  MessagesConvoContainer,
  MessagesChatContainer,
  MessagesTextContainer,
  MyMessage,
  TheirMessage,
  MessagesTopContainer,
  StyledSubmitInput,
  StyledTextInput,
  StyledSelectInput,
  StyledLogPage,
  StyledloginSignUpBox,
  StyledLoginSignUpForm,
  StyledLabel,
  StyledButton,
  StyledTextEmail,
  StyledRightAlignedForms,
  StyledRadioInput
}