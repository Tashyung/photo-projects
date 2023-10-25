import { Input, InputProps } from "@chakra-ui/react";

const StyledInput = (props: InputProps) => {
  const customStyles = {
    // 추가하고 싶은 스타일을 여기에 넣어주세요
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    padding: "8px",
  };
  return <Input {...props} style={customStyles} />;
};

export default StyledInput;