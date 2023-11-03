import React, { useRef } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import styled from 'styled-components';
import { Center, Image, Flex, Button } from '@chakra-ui/react';

interface ImageCropperProps {
  imageURL: string | null;
  onApplyCrop: (croppedImage: string) => void;
  // onCancelCrop: () => void;
  // children: React.ReactNode;  d버튼 요소를 전달받을 수 있도록 추가
  // setNewImageURL: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  imageURL,
  onApplyCrop,
}) => {
  // Cropper 레퍼런스를 만들어서 원본 이미지를 조작
  const cropperRef = useRef<ReactCropperElement>(null);

  // 적용하기 버튼 클릭 시 호출될 함수
  const handleApplyCrop = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      // 크롭된 이미지 데이터 URI 가져오기
      const croppedDataURL = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      console.log(croppedDataURL);
      onApplyCrop(croppedDataURL);
      // cropperRef.current?.getCroppedCanvas().toDataURL();
      // onApplyCrop(croppedDataURL);
    }
  };

  return (
    <>
      {imageURL && (
        <>
          <Flex flexDirection="column" position="relative" bottom="-80px">
            <Button onClick={handleApplyCrop} colorScheme="blue">
              적용하기
            </Button>
            <Cropper
              ref={cropperRef}
              src={imageURL}
              aspectRatio={3 / 4}
              viewMode={1}
              width={500}
              height={800}
              background={false}
              responsive
              autoCropArea={1}
              checkOrientation={false}
              guides
            />
          </Flex>
        </>
      )}
    </>
  );
};

export default ImageCropper;
