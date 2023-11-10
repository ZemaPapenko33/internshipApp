import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IFormContext {
  createTodo: boolean;
  email: string;
  password: string;
  isInvalidEmail: boolean;
  passwordLength: boolean;
  isUseEmail: boolean;
  setCreateTodo: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setIsInvalidEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUseEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordLength: React.Dispatch<React.SetStateAction<boolean>>;
  emailInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormProviderProps {
  children: ReactNode;
}

const FormContext = createContext<IFormContext | undefined>(undefined);

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [createTodo, setCreateTodo] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
  const [passwordLength, setPasswordLength] = useState<boolean>(false);
  const [isUseEmail, setIsUseEmail] = useState<boolean>(false);

  const emailInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsInvalidEmail(false);
    setIsUseEmail(false);
    setEmail(event.target.value);
  };

  const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(false);
    setPassword(event.target.value);
  };

  return (
    <FormContext.Provider
      value={{
        createTodo,
        email,
        password,
        isInvalidEmail,
        passwordLength,
        isUseEmail,
        setCreateTodo,
        setEmail,
        setPassword,
        setIsInvalidEmail,
        setPasswordLength,
        setIsUseEmail,
        emailInputHandler,
        passwordInputHandler
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = (): IFormContext => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a UseProvider');
  }

  return context;
};
