import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/authContext';
import { auth, db } from '../../../firebase';
import Header from '../../components/layout/Header';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Center, Box, Flex } from '@chakra-ui/react';
import StyledButton from '../../styles/Button';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [userName, setUserName] = useState<string>('');

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert('로그아웃에 성공했습니다.');
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패: ', error);
      alert('로그아웃에 실패했습니다.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        if (user.displayName) {
          setUserName(user.displayName);
        } else {
          const q = query(collection(db, 'user'), where('uid', '==', user.uid));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUserName(doc.data().nickname);
          });
        }
      } else {
        alert('사용자 정보가 없습니다. 로그인 해주세요.');
        navigate('/');
      }
    };
    fetchData();
  }, []);

  const getLoginMethod = (): string => {
    const userLoginMethod = user?.providerData[0]?.providerId;

    switch (userLoginMethod) {
      case 'password':
        return '이메일/패스워드';
      case 'google.com':
        return '구글';
      default:
        return '로그인방식이 없습니다.';
    }
  };

  const getSignUpDateTime = (): string => {
    if (user?.metadata?.creationTime) {
      const signUpDate = new Date(user.metadata.creationTime);
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      return signUpDate.toLocaleString('ko-KR', options);
    } else {
      return '가입 정보가 없습니다.';
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
      <Center flexDirection={'column'} alignItems={'baseline'}>
        <Header title="내 정보" />
        <Flex
          alignItems={'center'}
          marginBottom={5}
          marginLeft={7}
          marginTop={100}>
          <Box fontSize={20} minWidth={100}>
            이메일
          </Box>
          <Box>{user?.email}</Box>
        </Flex>
        <Flex alignItems={'center'} marginBottom={5} marginLeft={7}>
          <Box fontSize={20} minWidth={100}>
            닉네임
          </Box>
          <Box>{userName}</Box>
        </Flex>
        <Flex alignItems={'center'} marginBottom={5} marginLeft={7}>
          <Box fontSize={20} minWidth={100}>
            가입일자
          </Box>
          <Box>{getSignUpDateTime()}</Box>
        </Flex>
        <Flex alignItems={'center'} marginBottom={5} marginLeft={7}>
          <Box fontSize={20} minWidth={100}>
            로그인방식
          </Box>
          <Box>{getLoginMethod()}</Box>
        </Flex>

        <StyledButton
          onClick={handleLogout}
          width={250}
          height={50}
          marginTop={100}>
          로그아웃
        </StyledButton>
      </Center>
    </div>
  );
};

export default UserInfo;
