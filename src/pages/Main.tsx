import { Flex } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import StyledButton from '../styles/Button'
import StyledInput from '../styles/Input'

const Main = () => {

  const navigate = useNavigate();

  return (
    <>
      <p style={{padding: 20, textAlign: 'center'}}>첫 로그인페이지</p>
      <Flex justifyContent={'center'} gap="10px" padding="10">
        <Link to="join">회원가입</Link>
        <Link to="account">아이디 / PW찾기</Link>
      </Flex>
      <div style={{textAlign: 'center', padding: 10}}>
        <StyledButton onClick={() => navigate('/shoot')} >
          촬영하기
        </StyledButton>
      </div>
      <div style={{textAlign: 'center', padding: 10}}>
       <StyledInput placeholder='비밀번호를 입력해주세요' />
      </div>
    </>
  )
}

export default Main
