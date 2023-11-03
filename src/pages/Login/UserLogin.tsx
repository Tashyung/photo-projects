import React, { useState } from 'react';
import {
  Center,
  Flex,
  Img,
  FormControl,
  FormLabel,
  Link,
  Box,
} from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import StyledButton from '../../styles/Button';
import StyledInput from '../../styles/Input';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth } from '../../../firebase';
import addUserDataToFirestore from './UserJoin';

const UserLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('로그인에 성공했습니다.');
      setPersistence(auth, browserLocalPersistence);
      navigate('/shoot');
    } catch (e: any) {
      if (e.code === 'auth/invalid-email') {
        alert('이메일을 입력해주세요.');
      } else if (e.code === 'auth/missing-password') {
        alert('비밀번호를 입력해주세요.');
      } else {
        alert('로그인에 실패했습니다.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);

      alert('로그인에 성공했습니다.');
      navigate('/shoot');
    } catch (error) {
      console.error(error); // 로그인 에러를 콘솔에 출력
      alert('로그인에 실패했습니다.');
    }
  };
  
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Center flexDirection={'column'}>
        <Box>
          <Img
            height={'250px'}
            marginBottom={'10px'}
            src="/main.webp"
            alt="mainImg"
          />
        </Box>
        <Box flexDirection={'column'} textAlign={'center'} margin={'auto'}>
          <form onSubmit={handleLoginSubmit}>
            <FormControl
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}>
              <Box>
                <FormLabel width={250} marginTop={10}>
                  이메일
                </FormLabel>
                <StyledInput
                  marginBottom={5}
                  placeholder="이메일을 입력해주세요"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel width={250}>비밀번호</FormLabel>
                <StyledInput
                  marginBottom={10}
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>

              <StyledButton
                width={350}
                marginBottom={20}
                height={50}
                type="submit">
                로그인
              </StyledButton>
            </FormControl>
          </form>
        </Box>

        <Img src="/googleLogin.svg" onClick={handleGoogleLogin}></Img>

        <Flex justifyContent={'center'} gap="10px" padding="10">
          <Link as={ReactRouterLink} to="join" marginRight={2}>
            회원가입
          </Link>
          <Link as={ReactRouterLink} to="account" marginLeft={2}>
            아이디/PW찾기
          </Link>
        </Flex>
      </Center>
    </div>
  );
};

export default UserLogin;
