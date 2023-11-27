import { RegisterButtonWrapper } from './RegisterButtonStyled';

interface IRegisterButton {
  children: React.ReactNode;
}

const RegisterButton: React.FC<IRegisterButton> = ({ children }) => {
  return <RegisterButtonWrapper>{children}</RegisterButtonWrapper>;
};

export default RegisterButton;
