import { collection, doc, getDoc } from "firebase/firestore";
import MapWrap from "../../components/template/MapWrap"
import { db } from "../../../firebase";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore/lite";
import styled from "styled-components";
import {detailI} from "../../store/ImgAtom";

const PhotoDetail = () => {

  const [ detail, setDetail ] = useState<detailI | undefined>();

  const { id } = useParams();
  const usersCollectionRef = collection(db, "image");
  const docRef = doc(usersCollectionRef, id);

  // 이거 진짜 파베 timestamp 꿀팁이다
  const timestamp = new Timestamp(detail?.timestamp.seconds ?? 0, 0);
  const date = timestamp.toDate();
  
  // YY-MM-DD 형식으로 변환
  const year = date.getFullYear().toString().slice(2); // 뒤의 2자리만 가져오기
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1, 2자리로 표현
  const day = String(date.getDate()).padStart(2, '0'); // 날짜 2자리로 표현

  const formattedDate = `${year}-${month}-${day}`;

  function getDayOfWeek(date: Date): string {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[date.getDay()];
  }

  const dayOfWeek = getDayOfWeek(date);

  useEffect(() => {
    const getData = async () => {
      const docSnap = await getDoc(docRef); 
      const data = docSnap.data() as detailI;
      setDetail(data);
    }
    getData();
  }, []);

  const [isHoveredFront, setIsHoveredFront] = useState(false);

  return (
    <>
      <div style={{height:100}}></div>
      <CardWrapper>
        <Card>
          <CardFront isHoveredFront={isHoveredFront}
            onClick={() => setIsHoveredFront(!isHoveredFront)}
          >
            {
              <FrameWrap>
                <Imginner className="frame">
                  <img src={detail?.imageURL} alt="사진"/>  
                </Imginner>
                <Date>{formattedDate} ({dayOfWeek})</Date>
              </FrameWrap>
            }

          </CardFront>
          <CardBack isHoveredFront={isHoveredFront} onClick={() => setIsHoveredFront(!isHoveredFront)}>
            <MapWrap latitude={detail?.location?.latitude} 
            longitude={detail?.location?.longitude} />
          </CardBack>
        </Card>
      </CardWrapper>
    </>
  )
}

export default PhotoDetail

interface CardFrontProps {
  onClick: () => void;
  isHoveredFront : boolean;
  children: React.ReactNode;
}

const CardWrapper = styled.div`
  perspective: 1000px;
  width:100%;
  height:100%;
`

const FrameWrap = styled.div`
  position: relative;
`

const Imginner = styled.div`
  position: absolute;
  overflow: hidden;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  z-index:2;

  img{
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto;
    height: auto;
    min-width: 1000%;
    min-height: 1000%;
    max-width: none;
    max-height: none;
    -webkit-transform: translate(-50%,-50%) scale(0.1);
    transform: translate(-50%,-50%) scale(0.1);
  }

  &:after{
    content: "";
    display: block;
    padding-bottom: 133.33%;
  }
`

const CardFront = styled.div<CardFrontProps>`
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	transition: all 1s ease;
	transform-style: preserve-3d;
	backface-visibility: hidden;
	box-shadow: 2px 2px 20px rgba(255, 255, 255, 0.1);
  z-index: ${({ isHoveredFront }) => isHoveredFront ? 2 : 1};
  transform: ${({ isHoveredFront }) => isHoveredFront ? 'rotateY(180deg)' : 'rotateY(0deg)'};
  .frame-wrap{
    display: flex;
    justify-content: center;
  }

`

const CardBack = styled.div<CardFrontProps>`
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	transition: all 1s ease;
	transform-style: preserve-3d;
	backface-visibility: hidden;
	box-shadow: 2px 2px 20px rgba(0,0,0,.1);
  /* pointer-events: none; */
  z-index: ${({ isHoveredFront }) => isHoveredFront ? 1 : 2};
  transform: ${({ isHoveredFront }) => isHoveredFront ? 'rotateY(0deg)' : 'rotateY(180deg)'};
`

const Card = styled.div`
	width: 100%;
	height: 50vh;
	position: relative;
	perspective: 1000px;
`

const Date = styled.p`
  position: absolute;
  z-index: 3;
  top: -50px;
  left: 10%;
`
