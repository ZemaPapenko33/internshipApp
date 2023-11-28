import { GoogleButtonWrapper } from './GoogleButtonStyled';

interface IGoogleButton {
  children: React.ReactNode;
  googleButtonHandler: (event: React.MouseEvent) => void;
}

const GoogleButton: React.FC<IGoogleButton> = ({ children, googleButtonHandler }) => {
  return <GoogleButtonWrapper onClick={googleButtonHandler}>{children}</GoogleButtonWrapper>;
};

export default GoogleButton;
