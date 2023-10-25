import { ReactNode } from "react";
import { Button } from "@chakra-ui/react";

interface CustomButtonProps {
  children: ReactNode;
  oppositeColor?: boolean;
  onClick: () => void;
}

const StyledButton: React.FC<CustomButtonProps> = ({ children, oppositeColor, ...props }) => {
  const bgColor = oppositeColor ? "white" : "mainColor";
  const textColor = oppositeColor ? "mainColor" : "white";
  const hoverBgColor = oppositeColor ? "mainColor" : "white";
  const hoverTextColor = oppositeColor ? "white" : "mainColor";

  return (
    <Button
    bg={bgColor}
    color={textColor}
    _hover={{ bg: hoverBgColor, color: hoverTextColor }}
    {...props}
    >
      {children}
    </Button>
  );
};

export default StyledButton;