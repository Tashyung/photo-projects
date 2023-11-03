import styled from 'styled-components';
import StyledButton from '../../styles/Button';
import { useEffect, useState, useRef } from 'react';
import { Flex } from '@chakra-ui/react';
import { useImages } from '../../api/ImgFilter';
import { useRecoilValue } from 'recoil';
import { imgState, ImageData } from '../../store/ImgAtom';
import { DateRange } from 'react-date-range';
import './datepicker.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import PhotoItem from '../../components/template/PhotoItem';

const PhotoList = () => {
  // 카테고리 상태관리
  const [active, setActive] = useState('');
  const [filter, setFilter] = useState('send');

  const filterPhoto = (buttonType: string) => {
    setActive(buttonType);
    setFilter(buttonType);

    if (buttonType === 'received') {
      setFilteredData(images?.receiveImg);
    } else if (buttonType === 'send') {
      setFilteredData(images?.sendImg);
    }
  };

  // 리스트 전역상태 가져오기
  useImages();
  const images = useRecoilValue(imgState);

  // datePick 부분
  const [filteredData, setFilteredData] = useState<ImageData[] | undefined>(
    images?.sendImg,
  );

  // 이 부분의 부재였다 아무리 초기값을 filteredData 에 넣어줘도 렌더링이 안되는 이유,,
  useEffect(() => {
    setFilteredData(images?.sendImg);
  }, [images?.sendImg]);

  // 날짜 라이브러리
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const [showDate, setShowDate] = useState(false);

  // YY-MM-DD 형식으로 변환
  const startyear = dateRange.startDate.getFullYear();
  const startmonth = String(dateRange.startDate.getMonth() + 1).padStart(
    2,
    '0',
  );
  const startday = String(dateRange.startDate.getDate()).padStart(2, '0');

  const endyear = dateRange.endDate.getFullYear();
  const endmonth = String(dateRange.endDate.getMonth() + 1).padStart(2, '0');
  const endday = String(dateRange.endDate.getDate()).padStart(2, '0');

  const formattedStartDate = `${startyear}-${startmonth}-${startday}`;
  const formattedEndDate = `${endyear}-${endmonth}-${endday}`;

  // react-date-range에서 얻은 날짜
  const startDate = dateRange.startDate;
  const endDate = dateRange.endDate;

  // 달력 토글
  const datePicking = () => {
    setShowDate(!showDate);
  };
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowDate(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [calendarRef]);

  const onRangeChange = (ranges: any) => {
    setDateRange({
      startDate: ranges['selection'].startDate,
      endDate: ranges['selection'].endDate,
      key: ranges['selection'].key,
    });
  };

  // 카테고리 필터링
  useEffect(() => {
    const newData: ImageData[] | undefined =
      filter === 'received' ? images?.receiveImg : images?.sendImg;
    const filteredData = newData?.filter((item: any) => {
      const timestamp = new Date(item.timestamp.toDate());
      const itemDate = new Date(
        timestamp.getFullYear(),
        timestamp.getMonth(),
        timestamp.getDate(),
      );
      return itemDate >= startDate && itemDate <= endDate;
    });

    if (filteredData) {
      setFilteredData(filteredData); // 필터링된 데이터를 업데이트합니다.
    }
  }, [startDate, endDate]);

  return (
    <>
      <Flex paddingTop={5} gap={5} justifyContent={'space-between'}>
        <Flex alignItems={'center'} gap={5} ref={calendarRef}>
          <Flex
            onClick={() => datePicking()}
            alignItems={'center'}
            gap={5}
            style={{ cursor: 'pointer' }}>
            <p>
              <img src="/calendar.png" alt="이미지" width="30" />
            </p>
            <p>
              {formattedStartDate} ~ {formattedEndDate}
            </p>
          </Flex>
          {showDate && (
            <div>
              <DateRange
                editableDateInputs={true}
                onChange={onRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={[dateRange]}
                showDateDisplay={false}
              />
            </div>
          )}
        </Flex>
        <ButtonWrap>
          <StyledButton
            onClick={() => filterPhoto('received')}
            rounded
            className={active === 'received' ? 'on' : ''}>
            received
          </StyledButton>
          <StyledButton
            onClick={() => filterPhoto('send')}
            rounded
            oppositeColor
            className={active === 'send' ? 'on' : ''}>
            send
          </StyledButton>
        </ButtonWrap>
      </Flex>
      <ListWrap style={{ marginTop: 20 }}>
        {filteredData?.map((item) => (
          <PhotoItem key={item.imgId} imgId={item.imgId} imgURL={item.imgURL} />
        ))}
      </ListWrap>
    </>
  );
};

export default PhotoList;

const ListWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  gap: 10px;
  overflow-y: auto;
  height: 81vh;
`;

const ButtonWrap = styled.div`
  display: flex;
  button {
    width: 135px; /* 오버라이딩할 스타일 속성 */
    &:first-child {
      margin-right: -15px;
    }
    &:last-child {
      margin-left: -15px;
    }
    &.on {
      z-index: 10;
    }
  }
`;
