// ImgFilter.ts

import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../provider/authContext";
import { db } from "../../firebase";
import { useRecoilState } from 'recoil';
import { imgArray, imgState } from '../store/ImgAtom';

export const useImages = () => {

  const [images, setImages] = useRecoilState(imgState); 

  const user = useContext(AuthContext);
  const uid = user?.uid;

  const usersCollectionRef = collection(db, "user");
  const q = query(usersCollectionRef, where('uid', '==', uid));

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot && querySnapshot.docs && querySnapshot.docs[0]) {
          const doc = querySnapshot.docs[0];
          const data = doc.data() as imgArray;
          console.log('data 업데이트');
          setImages(data);

        } else {
          console.log("No documents found");
        }
      } catch (e) {
        console.log('에러는' + e);
      }
    };

    getData();
  }, [setImages]);

  return images;
};
