import styled from 'styled-components'
import StyledButton from '../../styles/Button'
import { useContext, useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useImages } from '../../api/ImgFilter'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { imgArray, imgState } from '../../store/ImgAtom';
import { AuthContext } from '../../provider/authContext'
import { db } from '../../../firebase'
import { collection } from 'firebase/firestore'
import { getDocs, query, where } from 'firebase/firestore'
import { DateRange } from 'react-date-range'
import '../../api/datepicker.css'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface ImageData {
  imgId: string;
  imgurl: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  }; 
}

const PhotoList = () => {

  const [active, setActive] = useState('');
  const [filter, setFilter] = useState('received');
  
  const filterPhoto = (buttonType: string) => {
    setActive(buttonType);
    setFilter(buttonType);

    if (buttonType === 'received') {
      setFilteredData(images?.receiveImg);
    } else if (buttonType === 'send') {
      setFilteredData(images?.sendImg);
    }
  }

  const images = useRecoilValue(imgState);

  useImages();

  console.log(images);

  // const receivedImg = images?.receiveImg;
  // const sendImg = images?.sendImg;

  // image 콜렉션에 문서 id 를 구하는데
  // 필드 receiveImg 혹은 sendImg 가 uid 인 문서의 id
  // const user = useContext(AuthContext);
  // const uid = user?.uid;
  // const usersCollectionRef = collection(db, "image");
  // const q = query(usersCollectionRef, where('receiveImg', '==', uid));


  // useEffect(() => {
  //   const getId = async () => {
  //     try {
  //       const querySnapshot = await getDocs(q);
  //       querySnapshot.forEach((doc: any) => {
  //         const docId = doc.id;
  //         console.log('해당 문서의 ID:', docId);
  //         console.log('a');
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
   
  //   getId();
  // }, []);

  // datePick 부분
  const [filteredData, setFilteredData] = useState<ImageData[] | undefined>(images?.receiveImg);

  // 날짜 라이브러리
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const [ showDate, setShowDate ] = useState(false);
  
  const startyear = dateRange.startDate.getFullYear();
  const startmonth = String(dateRange.startDate.getMonth() + 1).padStart(2, '0');
  const startday = String(dateRange.startDate.getDate()).padStart(2, '0');

  const endyear = dateRange.endDate.getFullYear();
  const endmonth = String(dateRange.endDate.getMonth() + 1).padStart(2, '0');
  const endday = String(dateRange.endDate.getDate()).padStart(2, '0');

  const formattedStartDate = `${startyear}-${startmonth}-${startday}`;
  const formattedEndDate = `${endyear}-${endmonth}-${endday}`;

  const datePicking = () => {
    setShowDate(!showDate)
  }

  const onRangeChange = (ranges: any) => {
    console.log(ranges); // native Date object
    setDateRange({
      startDate: ranges['selection'].startDate,
      endDate: ranges['selection'].endDate,
      key: ranges['selection'].key,
    });
  }

  const setImages = useSetRecoilState(imgState); 

  // react-date-range에서 얻은 날짜
  const startDate = dateRange.startDate;
  const endDate = dateRange.endDate;

  // Firestore 타임스탬프 형식으로 변환
  // const firestoreStartDate = {
  //   seconds: Math.floor(startDate.getTime() / 1000),
  //   nanoseconds: startDate.getMilliseconds() * 1000000
  // };

  // const firestoreEndDate = {
  //   seconds: Math.floor(endDate.getTime() / 1000),
  //   nanoseconds: endDate.getMilliseconds() * 1000000
  // };

  useEffect(() => {
    const newData: ImageData[] | undefined = filter === 'received' ? images?.receiveImg : images?.sendImg;
    const filteredData = newData?.filter((item: any) => {
      const timestamp = new Date(item.timestamp.toDate());
      const itemDate = new Date(timestamp.getFullYear(), timestamp.getMonth(), timestamp.getDate());
      return itemDate >= startDate && itemDate <= endDate;
    });

    console.log(filteredData);
    
    if (filteredData) {
      setFilteredData(filteredData); // 필터링된 데이터를 업데이트합니다.
    }

  }, [startDate, endDate]);
  

  return (
    <>      
    <Flex paddingTop={5} gap={5} justifyContent={'space-between'}>
      <Flex alignItems={'center'} gap={5}>
        <p onClick={() => datePicking()}><img src="/calendar.png" alt="이미지" width="30" /></p>
        <p>{formattedStartDate} ~ {formattedEndDate}</p> 
        {
          showDate && 
            <DateRange
            editableDateInputs={true}
            onChange={onRangeChange}
            moveRangeOnFirstSelection={false}
            ranges={[dateRange]}
            showDateDisplay={false}
            />          
        }
      </Flex>
      <ButtonWrap>
        <StyledButton onClick={() => filterPhoto('received')} rounded className={active === 'received' ? 'on' : ''}>received</StyledButton>
        <StyledButton onClick={() => filterPhoto('send')} rounded oppositeColor className={active === 'send' ? 'on' : ''}>send</StyledButton>
      </ButtonWrap>
      </Flex>
      <ListWrap style={{marginTop: 20}}>

        {filteredData?.map(item => (       
          <ListItem to={`/detail/${item.imgId}`} key={Math.random()}>
            <img src={item.imgurl} alt={'Image'}/>
          </ListItem>
        ))}

      </ListWrap>
    </>
  )
}

export default PhotoList

const ListWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  overflow-y: auto;
  height: 81vh;
`

const ListItem = styled(Link)`
  position: relative;
`

const ButtonWrap = styled.div`
  display:flex;
  button {
    width: 135px; /* 오버라이딩할 스타일 속성 */
    &:first-child{
      margin-right: -15px;
    }
    &:last-child{
      margin-left: -15px;
    }
    &.on{
      z-index:10;
    }
  }
`