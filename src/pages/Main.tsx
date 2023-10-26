import React, { useState } from 'react';
import { Center, Flex } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import StyledButton from '../styles/Button';
import StyledInput from '../styles/Input';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Main = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <img
          style={{ height: 250, marginBottom: 50 }}
          src="/main.webp"
          alt="mainImg"
        />
      </div>

      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            textAlign: 'center',
            width: 400,
            marginBottom: 10,
          }}>
          <p style={{ width: 100, margin: 'auto' }}> 이메일 </p>

          <StyledInput
            placeholder="이메일을 입력해주세요"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div
          style={{
            display: 'flex',
            textAlign: 'center',
            width: 400,
          }}>
          <p style={{ width: 100, margin: 'auto' }}> 비밀번호 </p>
          <StyledInput
            placeholder="비밀번호를 입력해주세요"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ textAlign: 'center', padding: 10 }}>
          <StyledButton style={{ width: 400 }} type="submit">
            로그인
          </StyledButton>
        </div>
      </form>
      <Flex justifyContent={'center'} gap="10px" padding="10">
        <Link to="join">회원가입</Link>
        <Link to="account">아이디 / PW찾기</Link>
      </Flex>
    </>
  );
};

export default Main;
