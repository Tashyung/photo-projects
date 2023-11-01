import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  GeoPoint,
} from 'firebase/firestore';
import { storage, db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import useGeoLocation from '../../hooks/useGeolocation';

const PhotoSave = ({
  imageURL,
  userUID,
}: {
  imageURL: string;
  userUID: string;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const userLocation = useGeoLocation();
  console.log(userLocation);

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

      // Firestore에 데이터 추가
      await addDoc(collection(db, 'image'), {
        imageURL: downloadURL,
        sender: userUID,
        receiver: '',
        isExchanged: false,
        timestamp: currentTimestamp,
        location: new GeoPoint(
          userLocation?.coordinates?.lat || 0,
          userLocation?.coordinates?.lng || 0,
        ),
      });

      const userDocRef = doc(db, 'user', userUID);
      await updateDoc(userDocRef, {
        sendImg: arrayUnion({
          imgURL: downloadURL,
          timestamp: currentTimestamp,
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
