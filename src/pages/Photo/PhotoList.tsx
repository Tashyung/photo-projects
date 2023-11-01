import styled from 'styled-components'
import StyledButton from '../../styles/Button'
import { useContext, useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useImages } from '../../api/ImgFilter'
import DateFilter from '../../api/DateFilter'
import { useRecoilValue } from 'recoil'
import { imgState } from '../../store/ImgAtom';
import { AuthContext } from '../../provider/authContext'
import { db } from '../../../firebase'
import { collection } from 'firebase/firestore'
import { getDocs, query, where } from 'firebase/firestore'


const PhotoList = () => {

  const [active, setActive] = useState('');
  const [filter, setFilter] = useState('received');
  
  const filterPhoto = (buttonType: string) => {
    setActive(buttonType);
    setFilter(buttonType);
  }

  const images = useRecoilValue(imgState);

  useImages();

  console.log(images);

  const receivedImg = images?.receiveImg;
  const sendImg = images?.sendImg;

  // image 콜렉션에 문서 id 를 구하는데
  // 필드 receiveImg 혹은 sendImg 가 uid 인 문서의 id
  const user = useContext(AuthContext);
  const uid = user?.uid;
  const usersCollectionRef = collection(db, "image");
  const q = query(usersCollectionRef, where('receiveImg', '==', uid));

  useEffect(() => {
    const getId = async () => {
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc: any) => {
          const docId = doc.id;
          console.log('해당 문서의 ID:', docId);
          console.log('a');
        });
      } catch (error) {
        console.error(error);
      }
    }
   
    getId();
  }, []);



  return (
    <>      
    <Flex paddingTop={5} gap={5}>
      <DateFilter />
      <ButtonWrap>
        <StyledButton onClick={() => filterPhoto('received')} rounded className={active === 'received' ? 'on' : ''}>received</StyledButton>
        <StyledButton onClick={() => filterPhoto('send')} rounded oppositeColor className={active === 'send' ? 'on' : ''}>send</StyledButton>
      </ButtonWrap>
      </Flex>
      <ListWrap style={{marginTop: 20}}>

        {filter === 'received' && receivedImg?.map(item => (       
          <ListItem to="/detail" key={Math.random()}>
            <img src={item.imgurl} alt={'Image'}/>
          </ListItem>
        ))}

        {filter === 'send' && sendImg?.map(item => (       
          <ListItem to="/detail" key={Math.random()}>
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
    width: 150px; /* 오버라이딩할 스타일 속성 */
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