import React, { useState } from 'react';
import { Center, Flex, Img, FormControl, FormLabel } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import StyledButton from '../../styles/Button';
import StyledInput from '../../styles/Input';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../../firebase';

const UserLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`아이디: ${email}, 비밀번호: ${password}`);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log(user);
    } catch (e) {
      const errorCode = e.code;
      const errorMessage = e.message;
      console.log(errorCode);
      console.log(errorMessage);
      // Handle the error accordingly
    }
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log('로그인성공');
      })
      .catch((error) => {
        console.log('로그인실패');
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <Center flexDirection={'column'}>
      <Flex justifyContent={'center'}>
        <Img
          height={'250px'}
          marginBottom={'10px'}
          src="/main.webp"
          alt="mainImg"
        />
      </Flex>
      <Center
        flexDirection={'column'}
        textAlign={'center'}
        width={400}
        margin={'auto'}>
        <form onSubmit={handleLoginSubmit}>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <StyledInput
              marginBottom={5}
              placeholder="이메일을 입력해주세요"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel>비밀번호</FormLabel>
            <StyledInput
              marginBottom={5}
              placeholder="비밀번호를 입력해주세요"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <StyledButton
              style={{ width: 189, marginBottom: 10 }}
              type="submit">
              로그인
            </StyledButton>
          </FormControl>
        </form>
      </Center>

      <Img src="/googleLogin.svg" onClick={handleGoogleLogin}></Img>

      <Flex justifyContent={'center'} gap="10px" padding="10">
        <Link to="join">회원가입</Link>
        <Link to="account">아이디 / PW찾기</Link>
      </Flex>
    </Center>
  );
};

export default UserLogin;
