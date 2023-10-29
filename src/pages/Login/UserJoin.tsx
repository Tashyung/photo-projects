import React, { useState, useEffect } from 'react';

import {
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';

import { Link, useNavigate } from 'react-router-dom';
import StyledButton from '../../styles/Button';
import StyledInput from '../../styles/Input';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}
interface ValidationInput {
  fieldName: keyof FormData;
  value: string;
  formData: FormData;
}

const UserJoin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    nickname: '',
  });

  const [isError, setIsError] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
    nickname: false,
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    nickname: '',
  });

  const validateField = ({
    fieldName,
    value,
    formData,
  }: ValidationInput): string => {
    let error = '';
    switch (fieldName) {
      case 'email':
        if (value.trim() === '') error = '이메일을 입력해주세요';
        else if (!/^\S+@\S+\.\S+$/.test(value))
          error = '올바른 이메일 형식이 아닙니다.';
        break;
      case 'password':
        if (value.trim() === '') error = '비밀번호를 입력해주세요';
        else if (value.length < 6)
          error = '비밀번호는 최소 6자 이상이어야 합니다';
        break;
      case 'confirmPassword':
        if (value.trim() === '') error = '비밀번호를 한번 더 입력해주세요';
        else if (value !== formData.password)
          error = '비밀번호가 일치하지 않습니다';
        break;
      case 'nickname':
        if (value.trim() === '') error = '닉네임을 입력해주세요';
        else if (value.length < 2 || value.length > 20)
          error = '닉네임은 2자에서 20자 사이어야 합니다';
        else if (!/^[a-zA-Z0-9가-힣]+$/.test(value))
          error = '닉네임은 특수문자를 포함할 수 없습니다';
        break;
      default:
        break;
    }
    return error;
  };

  const fieldNames: Array<keyof FormData> = [
    'email',
    'password',
    'confirmPassword',
    'nickname',
  ];

  useEffect(() => {
    fieldNames.forEach((fieldName) => {
      const value: string = formData[fieldName];
      const error = validateField({ fieldName, value, formData });

      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
      setIsError((prevIsError) => ({ ...prevIsError, [fieldName]: !!error }));
    });
  }, [formData]);

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('회원가입완료');
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      const user = userCredential.user;
      console.log(user);
    } catch (e) {
      const errorCode = e.code;
      const errorMessage = e.message;
      console.log(errorCode);
      console.log(errorMessage);
    }
  };

  return (
    <Center
      flexDirection={'column'}
      textAlign={'center'}
      width={400}
      margin={'auto'}>
      <form onSubmit={handleJoinSubmit}>
        <FormControl isRequired isInvalid={isError.email} marginBottom={5}>
          <FormLabel>이메일</FormLabel>
          <StyledInput
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <FormErrorMessage textAlign={'left'}>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={isError.password} marginBottom={5}>
          <FormLabel>비밀번호</FormLabel>
          <StyledInput
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <FormErrorMessage textAlign={'left'}>
            {errors.password}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={isError.confirmPassword}
          marginBottom={5}>
          <FormLabel>비밀번호 확인</FormLabel>
          <StyledInput
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          <FormErrorMessage textAlign={'left'}>
            {errors.confirmPassword}
          </FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={isError.nickname} marginBottom={5}>
          <FormLabel>닉네임</FormLabel>
          <StyledInput
            type="text"
            value={formData.nickname}
            onChange={(e) =>
              setFormData({ ...formData, nickname: e.target.value })
            }
          />
          <FormErrorMessage textAlign={'left'}>
            {errors.nickname}
          </FormErrorMessage>
        </FormControl>

        <StyledButton style={{ width: 189, marginBottom: 10 }} type="submit">
          가입하기
        </StyledButton>
      </form>
    </Center>
  );
};

export default UserJoin;

//   // 휴대폰 번호 유효성 검사
// if (formData.phone.trim() === '') {
//   newErrors.phone = '휴대폰 번호를 입력하세요.';
//   setIsValid(false);
// } else if (!/^(010|02)-\d{3,4}-\d{4}$/.test(formData.phone)) {
//   newErrors.phone = '010-1234-1234 형식으로 입력해주세요';
//   setIsValid(false);
// }
