import { ChakraProvider, Container, extendTheme } from '@chakra-ui/react';
import MainRouter from './router/MainRouter';
import { BrowserRouter } from 'react-router-dom';
import LoginRouter from './router/LoginRouter';
import AuthProvider from './provider/authProvider';

const theme = extendTheme({
  colors: {
    mainColor: '#F56565',
    subColor: '#FEB2B2',
  },
});

function App() {
  console.log(theme);
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Container minW="390px" bg="white" h="100vh" position="relative">
            <LoginRouter />
            <MainRouter />
          </Container>
        </BrowserRouter>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
