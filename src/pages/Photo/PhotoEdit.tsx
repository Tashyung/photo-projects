import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Center } from '@chakra-ui/react';
import StyledButton from '../../styles/Button';
import PhotoSave from './PhotoSave';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { GeoPoint, doc, getDoc } from 'firebase/firestore';

const PhotoEdit = () => {
  const location = useLocation();
  const imageURL = new URLSearchParams(location.search).get('imageURL');
  const [userUID, setUserUID] = useState(null);
  const [userLocation, setUserLocation] = useState(new GeoPoint(0, 0));

  console.log('imageURL: ', imageURL);

  useEffect(() => {
    // 현재 로그인한 사용자의 UID 가져오기
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUID(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // 사용자의 현재 위치
  useEffect(() => {
    if (userUID) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setUserLocation(new GeoPoint(latitude, longitude));
          },
          (error) => {
            console.error('위치 정보 가져오기 실패:', error);
          },
        );
      } else {
        console.error('브라우저에서 지리적 위치를 지원하지 않습니다.');
      }
    }
  }, [userUID]);

  return (
    <>
      {imageURL && userUID && userLocation && (
        <>
          <Center>
            <img
              src={imageURL}
              style={{ maxWidth: '100%', maxHeight: '400px' }}
            />
          </Center>
          <Center>
            <PhotoSave
              imageURL={imageURL}
              userUID={userUID}
              userLocation={userLocation}
            />
          </Center>
        </>
      )}
    </>
  );
};

export default PhotoEdit;
