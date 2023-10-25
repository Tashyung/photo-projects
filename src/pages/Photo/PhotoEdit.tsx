import StyledButton from "../../styles/Button"


const PhotoEdit = () => {
  return (
    <>
      <div style={{padding: 20, textAlign: 'center'}}>
        사진 편집
      </div>
      <div style={{textAlign: 'center'}}>
      <StyledButton onClick={() => console.log('clicked')} >
        사진 저장
      </StyledButton>
      </div>
    </>
  )
}

export default PhotoEdit
