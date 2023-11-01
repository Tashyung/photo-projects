import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { storage, db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';

const PhotoSave = ({
  imageURL,
  userUID,
  userLocation,
}: {
  imageURL: string;
  userUID: string;
  userLocation: any;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    setIsUploading(true);

    try {
      const storageRef = ref(storage, 'album/' + new Date().getTime());
      await uploadBytes(
        storageRef,
        await fetch(imageURL).then((res) => res.blob()),
      ); // 이미지 업로드
      const downloadURL = await getDownloadURL(storageRef);

      const currentTimestamp = new Date(); // 현재 로컬 시간
      console.log(currentTimestamp);

      // Firestore에 데이터 추가
      const imageDocRef = await addDoc(collection(db, 'image'), {
        imageURL: downloadURL,
        sender: userUID,
        receiver: '',
        isExchanged: false,
        timestamp: currentTimestamp, // 현재 로컬 시간 사용
        location: userLocation,
      });

      const userDocRef = doc(db, 'user', userUID);
      await updateDoc(userDocRef, {
        sendImg: arrayUnion({
          imgURL: downloadURL,
          timestamp: currentTimestamp, // 현재 로컬 시간 사용
        }),
      });
      alert('사진이 전송 되었습니다!');
      navigate(`/arrival`);
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      alert('사진 전송 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleUpload}
        isLoading={isUploading}
        loadingText="보내는 중...">
        이미지 보내기
      </Button>
    </div>
  );
};

export default PhotoSave;
