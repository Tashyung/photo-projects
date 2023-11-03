import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navigation = () => {
  return (
    <>
      <NavigateWrap>
        <NavigateItem>
          <NavigateLink to="/shoot">
            <img src="/camera.png" alt="아이콘" width="24" />
            촬영
        </NavigateLink>
        </NavigateItem>
        <NavigateItem>
          <NavigateLink to="/edit">
          <img src="/sliders.png" alt="아이콘" width="24" />
            편집
          </NavigateLink>
        </NavigateItem>
        <NavigateItem>
          <NavigateLink to="/lists">
          <img src="/MdImage.png" alt="아이콘" width="24" />
            내 앨범
          </NavigateLink>
        </NavigateItem>
        <NavigateItem>
          <NavigateLink to="/mypage">
          <img src="/user.png" alt="아이콘" width="24" />
            내 정보
          </NavigateLink>
        </NavigateItem>
      </NavigateWrap>
    </>
  )
}

export default Navigation

const NavigateWrap = styled.ul`
  position: absolute;
  z-index: 20;
  width:100%;
  left:0;
  bottom:0;
  display: flex;
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.1);
`

const NavigateItem = styled.li`
  flex: 1 0 25%;
  max-width: 25%;
  text-align:center;
`

const NavigateLink = styled(Link)`
  padding: 10px 0;
  color: #444;
  display: inline-flex;
  align-items: center;
  gap:5px;
  flex-direction: column;
  text-decoration: none;
`


