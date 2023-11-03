import { ReactNode } from 'react';
import { Button, useToken } from '@chakra-ui/react';

interface CustomButtonProps {
  children: ReactNode;
  oppositeColor?: boolean;
  rounded?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disableHover?: boolean;
}

const StyledButton: React.FC<CustomButtonProps> = ({ children, oppositeColor, rounded, disableHover, ...props }) => {
  const bgColor = oppositeColor ? "white" : "mainColor";
  const textColor = oppositeColor ? "mainColor" : "white";

  let hoverStyles = {};
  if (!disableHover) {
    const hoverBgColor = oppositeColor ? "mainColor" : "white";
    const hoverTextColor = oppositeColor ? "white" : "mainColor";
    hoverStyles = {
      _hover: { bg: hoverBgColor, color: hoverTextColor },
    };
  }

  return (
    <Button
    bg={bgColor}
    color={textColor}
    borderRadius={rounded ? "20px" : "5px"}
    border={`1px solid ${useToken("colors", "mainColor")}`}
    {...hoverStyles}
    {...props}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
