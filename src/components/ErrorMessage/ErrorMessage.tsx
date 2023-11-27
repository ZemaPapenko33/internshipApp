import { ErrorMessageWrapper } from './ErrorMessageStyled';

interface IErrorMessage {
  children: React.ReactNode;
}

const ErrorMessage: React.FC<IErrorMessage> = ({ children }) => {
  return <ErrorMessageWrapper>{children}</ErrorMessageWrapper>;
};

export default ErrorMessage;
