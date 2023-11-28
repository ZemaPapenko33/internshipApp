import { FormEvent } from 'react';
import { FormRegisterAndAuthWrapper } from './FormRegisterAndAuthStyled';

interface IFormRegisterAndAuth {
  children: React.ReactNode;
  formHandler: (event: FormEvent) => void;
}

const FormRegisterAndAuth: React.FC<IFormRegisterAndAuth> = ({ children, formHandler }) => {
  return <FormRegisterAndAuthWrapper onSubmit={formHandler}>{children}</FormRegisterAndAuthWrapper>;
};

export default FormRegisterAndAuth;
