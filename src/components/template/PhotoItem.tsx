import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface PhotoItemProps {
  imgId: string;
  imgurl: string;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ imgId, imgurl }) => {

  return (
    <ListItem to={`/detail/${imgId}`}>
      <Frame />
      <img src={imgurl} alt={'Image'}/>
    </ListItem>
  );
}

export default PhotoItem;

const ListItem = styled(Link)`
  position: relative;
  min-height: 300px;
  img{
    position: absolute;
    z-index:0;
    left:50%;
    top:10px;
    transform: translateX(-50%);
  }
`;

const Frame = styled.div`
  position: absolute;
  z-index:1;
  background: url('/photo-bg.png') no-repeat; 
  background-size:contain;
  background-position: center;
  width: 100%;
  height: 300px;
`
