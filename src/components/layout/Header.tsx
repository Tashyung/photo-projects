import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronLeftIcon } from '@chakra-ui/icons';

const Header = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <HeaderWrap>
      <ChevronLeftIcon
        fontSize={50}
        onClick={() => navigate(-1)}
        cursor={'pointer'}
      />
      {title}
    </HeaderWrap>
  );
};

export default Header;

const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin-bottom: 10px;
  font-size: 30px;
`;
