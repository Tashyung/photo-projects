import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface PhotoItemProps {
  imgId: string;
  imgURL: string;
}

const PhotoItem = ({ imgId, imgURL }: PhotoItemProps) => {

  return (
    <ListItem to={`/detail/${imgId}`}>
      <Frame>
        <img src="/photo-bg.png" alt="frame"/>
      </Frame>
      <ImgInner>
        <img src={imgURL} alt={'Image'}/>
      </ImgInner>
    </ListItem>
  );
}

export default PhotoItem;

const ListItem = styled(Link)`
  position: relative;
  min-height: 370px;
  @media (max-width: 576px) {
    min-height: 330px
  }
  @media (max-width: 480px) {
    min-height: 280px
  }
  @media (max-width: 400px) {
    min-height: 250px
  }
`;

const ImgInner = styled.div`
    display: block;
    position: absolute;
    overflow: hidden;
    top:10px;
    width:100%;
    z-index:1;
  img{
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto;
    height: auto;
    min-width: 1000%;
    min-height: 1000%;
    max-width: none;
    max-height: none;
    -webkit-transform: translate(-50%,-50%) scale(0.1);
    transform: translate(-50%,-50%) scale(0.1);
  }

  &:after{
    content: "";
    display: block;
    padding-bottom: 109.33%;
  }
  
`

const Frame = styled.div`
  position: absolute;
  width:100%;
  z-index:2;
  overflow: hidden;
  img{
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto;
    height: auto;
    min-width: 1000%;
    min-height: 1000%;
    max-width: none;
    max-height: none;
    -webkit-transform: translate(-50%,-50%) scale(0.1);
    transform: translate(-50%,-50%) scale(0.1);
  }

  &:after{
    content: "";
    display: block;
    padding-bottom: 133.33%;
  }
`