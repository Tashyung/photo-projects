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
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';

import { addUserDataToFirestore } from './UserJoin'; // 파일 경로는 상황에 맞게 조정하세요.

const UserLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('로그인에 성공했습니다.');
      await setPersistence(auth, browserLocalPersistence);
      navigate('/shoot');
    } catch (e: any) {
      if (e.code === 'auth/invalid-email') {
        alert('유효하지 않은 이메일 주소입니다.');
      } else if (e.code === 'auth/wrong-password') {
        alert('잘못된 비밀번호입니다.');
      } else if (e.code === 'auth/user-not-found') {
        alert('존재하지 않는 사용자입니다.');
      } else {
        alert('로그인에 실패했습니다: ' + e.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDocRef = doc(db, 'user', user.uid);
      console.log('userDocRef:', userDocRef);
      const docSnap = await getDoc(userDocRef);
      console.log('docSnap:', docSnap);
      if (!docSnap.exists()) {
        await addUserDataToFirestore(db, user.uid, user.displayName || 'user');
        console.log('초기화됨');
      }

      alert('로그인에 성공했습니다.');
      navigate('/shoot');
    } catch (error) {
      console.error(error);
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
