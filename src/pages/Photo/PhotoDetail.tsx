import { GeoPoint, collection, doc, getDoc, query, where } from "firebase/firestore";
import KakaoMap from "../../components/template/KakaoMap"
import { db } from "../../../firebase";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore/lite";


interface detailI {
  isExchanged: boolean,
  receiver: string,
  sender: string,
  location: GeoPoint,
  imageURL: string,
  timestamp: Timestamp
}

const PhotoDetail = () => {

  const [ detail, setDetail ] = useState<detailI>();

  const { id } = useParams();
  const usersCollectionRef = collection(db, "image");
  const docRef = doc(usersCollectionRef, id);

  useEffect(() => {
    const getData = async () => {
      const docSnap = await getDoc(docRef); 
      const data = docSnap.data() as detailI;
      setDetail(data);
    }
    getData();
  }, []);

  console.log(detail);
  console.log(detail?.location.latitude);
  console.log(detail?.location.longitude);


  return (
    <>
      <KakaoMap latitude={detail?.location?.latitude} 
      longitude={detail?.location?.longitude} />
      {
        <div>
          <p>위도는? {detail?.location?.latitude}</p>
          <p>위도는? {detail?.location?.longitude}</p>
          <img src={detail?.imageURL} alt="사진"/>  
        </div>
      }

    </>
  )
}

export default PhotoDetail
