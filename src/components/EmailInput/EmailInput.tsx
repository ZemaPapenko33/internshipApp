import { EmailInputWrapper } from './EmailInputStyled';

interface IEmailInput {
  emailInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<IEmailInput> = ({ emailInputHandler }) => {
  return (
    <EmailInputWrapper name="email" type="email" placeholder="Email" onChange={emailInputHandler} />
  );
};

export default EmailInput;
