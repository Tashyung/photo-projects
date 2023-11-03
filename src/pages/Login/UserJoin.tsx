import React, { useState, useEffect } from 'react';
import {
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../../styles/Button';
import StyledInput from '../../styles/Input';
import { auth, db } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  Firestore,
} from 'firebase/firestore';
import Header from '../../components/layout/Header';

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

const addUserDataToFirestore = async (
  db: Firestore,
  uid: string,
  nickname: string,
) => {
  try {
    const userDocRef = doc(db, 'user', uid);
    await setDoc(userDocRef, {
      receiveImg: [],
      sendImg: [],
      nickname,
      uid,
    });
  } catch (e) {
    alert('유저데이터 업로드에 실패 했습니다. ');
  }
};

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

    try {
      const q = query(
        collection(db, 'user'),
        where('nickname', '==', formData.nickname),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert('닉네임이 이미 사용 중입니다.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      const user = userCredential.user;
      await addUserDataToFirestore(db, user.uid, formData.nickname);

      alert('회원가입에 성공했습니다.');
      navigate('/');
    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        alert('이미 가입된 이메일 입니다.');
      } else {
        alert('회원가입에 실패했습니다');
      }
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
        <Header title={'회원가입'} />

        <form onSubmit={handleJoinSubmit}>
          <FormControl
            isRequired
            isInvalid={isError.email}
            marginBottom={5}
            marginLeft={7}
            width={250}>
            <FormLabel>이메일</FormLabel>
            <StyledInput
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <FormErrorMessage textAlign={'left'}>
              {errors.email}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={isError.password}
            marginBottom={5}
            marginLeft={7}
            width={250}>
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
            marginBottom={5}
            marginLeft={7}
            width={250}>
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

          <FormControl
            isRequired
            isInvalid={isError.nickname}
            marginBottom={10}
            marginLeft={7}
            width={250}>
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

          <StyledButton width={300} marginBottom={10} type="submit">
            가입하기
          </StyledButton>
        </form>
      </Center>
    </div>
  );
};

export default { addUserDataToFirestore, UserJoin };
