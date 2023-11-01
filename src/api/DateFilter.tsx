import { collection, getDocs, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { db } from '../../firebase';
import { AuthContext } from '../provider/authContext';
import { useImages } from './ImgFilter';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { imgArray, imgState } from '../store/ImgAtom';

const DateFilter = () => {

  // 날짜 라이브러리
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const onRangeChange = (ranges: any) => {
    console.log(ranges); // native Date object
    setDateRange({
      startDate: ranges['selection'].startDate,
      endDate: ranges['selection'].endDate,
      key: ranges['selection'].key,
    });
  }
  
  const setImagesState = useSetRecoilState(imgState);
  // const images = useRecoilValue(imgState);

  const user = useContext(AuthContext);
  const uid = user?.uid;

// react-date-range에서 얻은 날짜
const startDate = dateRange.startDate;
const endDate = dateRange.endDate;

// Firestore 타임스탬프 형식으로 변환
const firestoreStartDate = {
  seconds: Math.floor(startDate.getTime() / 1000),
  nanoseconds: startDate.getMilliseconds() * 1000000
};

const firestoreEndDate = {
  seconds: Math.floor(endDate.getTime() / 1000),
  nanoseconds: endDate.getMilliseconds() * 1000000
};


const usersCollectionRef = collection(db, 'image');
const q = query(usersCollectionRef, 
  where('receiver', '==', uid),
  where('timestamp', '>=', firestoreStartDate),
  where('timestamp', '<=', firestoreEndDate)
);

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(q);
        const doc = querySnapshot.docs
        console.log(doc)


        // setImagesState(filteredImages);
      } catch (e) {
        console.error('Error getting documents: ', e);
      }
    };
    
    getData();
  }, [dateRange.startDate, dateRange.endDate]);

  return (
    <div>
      <DateRange
        editableDateInputs={true}
        onChange={onRangeChange}
        moveRangeOnFirstSelection={false}
        ranges={[dateRange]}/>
    </div>
  );
}

export default DateFilter;
