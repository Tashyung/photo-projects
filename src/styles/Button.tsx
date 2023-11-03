import { ReactNode } from 'react';
import { Button, useToken } from '@chakra-ui/react';

interface CustomButtonProps {
  children: ReactNode;
  oppositeColor?: boolean;
  rounded?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
<<<<<<< HEAD
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
=======
  width?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;
  height?: string | number;
  type?: 'button' | 'submit' | 'reset';
}

const StyledButton: React.FC<CustomButtonProps> = ({
  children,
  oppositeColor,
  rounded,
  width,
  marginBottom,
  height,
  marginTop,
  ...props
}) => {
  const bgColor = oppositeColor ? 'white' : 'mainColor';
  const textColor = oppositeColor ? 'mainColor' : 'white';
  const hoverBgColor = oppositeColor ? 'mainColor' : 'white';
  const hoverTextColor = oppositeColor ? 'white' : 'mainColor';

  return (
    <Button
      bg={bgColor}
      color={textColor}
      _hover={{ bg: hoverBgColor, color: hoverTextColor }}
      borderRadius={rounded ? '20px' : '5px'}
      border={`1px solid ${useToken('colors', 'mainColor')}`}
      width={width}
      marginTop={marginTop}
      marginBottom={marginBottom}
      height={height}
      {...props}>
>>>>>>> dev
      {children}
    </Button>
  );
};

export default StyledButton;
