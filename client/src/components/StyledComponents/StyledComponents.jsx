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