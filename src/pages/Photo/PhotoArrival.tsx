import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Center, Image } from '@chakra-ui/react';
import StyledButton from '../../styles/Button';
import { db, auth } from '../../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const PhotoArrival = () => {
  const navigate = useNavigate();
  const [randomPhoto, setRandomPhoto] = useState(null);
  const [userUID, setUserUID] = useState(null);

  // 사용자의 UID 가져오기
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUID(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);
  const getRandomPhoto = async () => {
    const photosRef = collection(db, 'image');
    const querySnapshot = await getDocs(
      query(photosRef, where('isExchanged', '==', false)),
    );

    const photos = [];
    querySnapshot.forEach((doc) => {
      photos.push(doc);
    });

    if (photos.length > 0) {
      const randomIndex = Math.floor(Math.random() * photos.length);
      const randomPhotoDoc = photos[randomIndex];

      await updateDoc(doc(photosRef, randomPhotoDoc.id), {
        // isExchanged: true,
        receiver: userUID,
      });

      setRandomPhoto(randomPhotoDoc.data().imageURL);
    }
  };

  useEffect(() => {
    getRandomPhoto();
  }, []);

  const handleGoToList = () => {
    navigate('/lists');
  };

  return (
    <div>
      <Center>{randomPhoto && <Image src={randomPhoto} maxW="400px" />}</Center>
      <Center>
        <Button onClick={handleGoToList}>앨범으로 이동</Button>
      </Center>
    </div>
  );
};

export default PhotoArrival;
