import { LoginButtonWrapper } from './LoginButtonStyled';

interface ILoginButton {
  children: React.ReactNode;
}

const LoginButton: React.FC<ILoginButton> = ({ children }) => {
  return <LoginButtonWrapper>{children}</LoginButtonWrapper>;
};

export default LoginButton;
