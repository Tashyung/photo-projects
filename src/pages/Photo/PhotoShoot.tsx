import React, { useRef, useState } from 'react';
import StyledButton from '../../styles/Button';
import { Button, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const PhotoShoot = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePhotoUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imageURL = URL.createObjectURL(files[0]);
      setSelectedImage(imageURL);
    }
  };

  const handleEditClick = () => {
    if (selectedImage) {
      navigate(`/edit?imageURL=${selectedImage}`);
    } else {
      handlePhotoUpload();
    }
  };

  return (
    <>
      {selectedImage && (
        <Center>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: '100%', maxHeight: '400px' }}
          />
        </Center>
      )}
      <Center>
        <Button onClick={selectedImage ? handleEditClick : handlePhotoUpload}>
          {selectedImage ? '편집하기' : '사진 촬영'}
        </Button>
      </Center>
      <div style={{ textAlign: 'center' }}>
        {/* <StyledButton>사진 편집</StyledButton> */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </>
  );
};

export default PhotoShoot;
