import { PasswordInputWrapper } from './PasswordInputStyled';

interface IPasswordInput {
  passwordInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<IPasswordInput> = ({ passwordInputHandler }) => {
  return (
    <PasswordInputWrapper
      name="password"
      type="password"
      placeholder="Password"
      onChange={passwordInputHandler}
    />
  );
};

export default PasswordInput;
