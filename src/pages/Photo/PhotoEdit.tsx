import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Center, Image, Box, Button } from '@chakra-ui/react';
import PhotoSave from './PhotoSave';
import { AuthContext } from '../../provider/authContext';
import ImageCropper from '../../components/template/ImageCropper';
import styled from 'styled-components';

const PhotoEdit = () => {
  const location = useLocation();
  const imageURL = new URLSearchParams(location.search).get('imageURL');
  const navigate = useNavigate();
  console.log(imageURL);

  const user = useContext(AuthContext);
  if (!user) {
    navigate('/login');
    return null;
  }

  // 새로운 이미지 url
  const [newImageURL, setNewImageURL] = useState<string | null>(null);
  const [crop, setCrop] = useState<Boolean>(false);

  const a = () => {
    if (newImageURL === null) {
      setNewImageURL(imageURL);
      console.log(newImageURL);
    }
  };
  a();

  // ImageCropper에서 '적용하기' 버튼 클릭 시 호출될 함수
  const handleApplyCrop = (croppedImage: string) => {
    setNewImageURL(croppedImage);
    setCrop(true);
  };

  // 자르기 했을 때
  const handleCrop = () => {
    setCrop(false);
  };

  return (
    <>
      {imageURL && user.uid && (
        <>
          <Center>
            {newImageURL && (
              <PhotoSave imageURL={newImageURL} userUID={user.uid} />
            )}
          </Center>
          {crop ? (
            <Box
              width="100%" // 원하는 고정된 너비 설정
              height="700px" // 원하는 고정된 높이 설정
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              bottom="-70px">
              {newImageURL && (
                <Image
                  src={newImageURL}
                  alt="Image"
                  display="block" // 이미지가 인라인으로 표시되지 않도록 설정
                  width="100%" // 이미지의 가로 너비를 부모 Box에 맞게 설정
                  height="auto" // 높이를 자동으로 조절하여 종횡비를 유지
                />
              )}
            </Box>
          ) : (
            <Center>
              <ImageCropper
                onApplyCrop={handleApplyCrop}
                imageURL={newImageURL}
              />
            </Center>
          )}

          <EditToolWrap>
            <EditToolItem onClick={handleCrop}>
              <img src="/png/Cropfree.png" />
              자르기
            </EditToolItem>
            <EditToolItem>
              <img src="/png/Croprotate.png" />
              좌우반전
            </EditToolItem>
            <EditToolItem>
              <img src="/png/Blur.png" />
              블러
            </EditToolItem>
            {/* <EditToolItem>
              <img src="/png/Vector.png" />
              필터
            </EditToolItem> */}
          </EditToolWrap>
        </>
      )}
    </>
  );
};

export default PhotoEdit;

const EditToolWrap = styled.ul`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.1);
`;

const EditToolItem = styled.li`
  flex: 1 0 2%;
  max-width: 70px;
  curser: pointer;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
