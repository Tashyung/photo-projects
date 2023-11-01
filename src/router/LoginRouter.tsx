import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import UserJoin from '../pages/Login/UserJoin';
import UserAccount from '../pages/Login/UserAccount';
import { Container } from '@chakra-ui/react';

const LoginRouter = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      margin={0}
      height={'100%'}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<UserJoin />} />
        <Route path="/account" element={<UserAccount />} />
      </Routes>
    </Container>
  );
};

export default LoginRouter;
