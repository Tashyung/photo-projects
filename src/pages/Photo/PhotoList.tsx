import styled from "styled-components"
import StyledInput from "../../styles/Input"
import StyledButton from "../../styles/Button"
import { useState } from "react"
import { Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const PhotoList = () => {

  const [active, setActive] = useState('')

  const filterPhoto = (buttonType: string) => {
    setActive(buttonType);
  }

  return (
    <>      
    <Flex paddingTop={5} gap={5}>
      <StyledInput placeholder="날짜 검색"/>
      <ButtonWrap>
        <StyledButton onClick={() => filterPhoto('received')} rounded className={active === 'received' ? 'on' : ''}>received</StyledButton>
        <StyledButton onClick={() => filterPhoto('send')} rounded oppositeColor className={active === 'send' ? 'on' : ''}>send</StyledButton>
      </ButtonWrap>
      </Flex>
      <ListWrap style={{marginTop: 20}}>
        <ListItem to=":id">
          <img src="http://via.placeholder.com/400x500"/>
        </ListItem>
        <ListItem to=":id">
          <img src="http://via.placeholder.com/400x500"/>
        </ListItem>
        <ListItem to=":id">
          <img src="http://via.placeholder.com/400x500"/>
        </ListItem>
        <ListItem to=":id">
          <img src="http://via.placeholder.com/400x500"/>
        </ListItem>
        <ListItem to=":id">
          <img src="http://via.placeholder.com/400x500"/>
        </ListItem>
        <ListItem to=":id">
          <img src="http://via.placeholder.com/400x500"/>
        </ListItem>
      </ListWrap>
    </>
  )
}

export default PhotoList

const ListWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  overflow-y: auto;
  height: 81vh;
`

const ListItem = styled(Link)`
  position: relative;
`

const ButtonWrap = styled.div`
  display:flex;
  button {
    width: 150px; /* 오버라이딩할 스타일 속성 */
    &:first-child{
      margin-right: -15px;
    }
    &:last-child{
      margin-left: -15px;
    }
    &.on{
      z-index:10;
    }
  }
`