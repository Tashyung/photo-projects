import StyledButton from "../../styles/Button"

const PhotoList = () => {
  return (
    <>
      <div style={{padding: 20, textAlign: 'center'}}>
        사진 리스트
      </div>
      <div style={{textAlign: 'center'}}>
        <StyledButton onClick={() => console.log('clicked')} >
          사진 저장
        </StyledButton>
      </div>
    </>
  )
}

export default PhotoList
