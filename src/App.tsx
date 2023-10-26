import { ChakraProvider, Container, extendTheme } from '@chakra-ui/react';
import MainRouter from './router/MainRouter';
import { BrowserRouter } from 'react-router-dom';
import LoginRouter from './router/LoginRouter';

const theme = extendTheme({
  colors: {
    mainColor: '#F56565',
    subColor: '#FEB2B2',
  },
});

function App() {
  console.log(theme);
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Container
          minW="390px"
          bg="white"
          h="100vh"
          position="relative"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          <LoginRouter />
          <MainRouter />
        </Container>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
