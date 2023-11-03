import { useContext, useEffect, useState } from 'react';
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
} from 'firebase/firestore';
import { AuthContext } from '../../provider/authContext';

const PhotoArrival = () => {
  const navigate = useNavigate();
  const [randomPhoto, setRandomPhoto] = useState(null);
  const user = useContext(AuthContext);
  if (!user) {
    navigate('/login');
    return null;
  }

  const getRandomPhoto = async () => {
    const photosRef = collection(db, 'image');
    const querySnapshot = await getDocs(
      query(photosRef, where('isExchanged', '==', false)),
    );

    const photos: any = [];
    querySnapshot.forEach((doc) => {
      photos.push(doc);
    });

    if (photos.length > 0) {
      const randomIndex = Math.floor(Math.random() * photos.length);
      const randomPhotoDoc = photos[randomIndex];

      await updateDoc(doc(photosRef, randomPhotoDoc.id), {
        isExchanged: true,
        receiver: user.uid,
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
