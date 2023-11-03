import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Center, Image } from '@chakra-ui/react';
import { db } from '../../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from 'firebase/firestore';
import { AuthContext } from '../../provider/authContext';

interface Photo {
  id: string;
  imageURL: string;
  isExchanged: boolean;
}

const PhotoArrival = () => {
  const navigate = useNavigate();
  const [randomPhoto, setRandomPhoto] = useState<string | null>(null);
  const [randomPhotoDoc, setRandomPhotoDoc] = useState<any | null>(null);
  const user = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const currentTimestamp = new Date().toISOString();

  const getRandomPhoto = useCallback(async () => {
    const photosRef = collection(db, 'image');
    const querySnapshot = await getDocs(
      query(photosRef, where('isExchanged', '==', false)),
    );

    const photos: Photo[] = [];
    querySnapshot.forEach((doc) => {
      const { id, ...photoData } = doc.data() as Photo;
      photos.push({ id: doc.id, ...photoData });
    });

    if (photos.length > 0) {
      const randomIndex = Math.floor(Math.random() * photos.length);
      const randomPhotoDoc = photos[randomIndex];
      setRandomPhotoDoc(randomPhotoDoc);

      await updateDoc(doc(db, 'image', randomPhotoDoc.id), {
        isExchanged: true,
        receiver: user?.uid,
      });

      setRandomPhoto(randomPhotoDoc.imageURL);
    }
  }, [db, user?.uid]);

  useEffect(() => {
    getRandomPhoto();
  }, [getRandomPhoto]);

  const updateReceiveImg = async (imageID: string, imgURL: string) => {
    if (!user) {
      console.error('No user found');
      return;
    }
    const userRef = doc(db, 'user', user.uid);

    await updateDoc(userRef, {
      receiveImg: arrayUnion({
        imgId: imageID,
        imgURL,
        timestamp: currentTimestamp,
      }),
    });
  };

  useEffect(() => {
    if (randomPhoto) {
      updateReceiveImg(randomPhotoDoc.id, randomPhoto);
    }
  }, [randomPhoto]);

  // useEffect(() => {
  //   if (randomPhoto && randomPhotoDoc) {
  //     updateReceiveImg(randomPhotoDoc.id, randomPhoto);
  //   }
  // }, [randomPhoto, randomPhotoDoc]);

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
