import styled from 'styled-components';

// complementary color of our blue - 	#383838
// triadic colors 	#8F386A, #6A8F38

const StyledNavBar = styled.div`
  background-color: #386A8F;
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

export {
  StyledNavBar,
  StyledNavBarIcon,
  StyledNavBarLinks
}