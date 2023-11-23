import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IFormContext {
  createTodo: boolean;
  email: string;
  password: string;
  isInvalidEmail: boolean;
  passwordLength: boolean;
  isUseEmail: boolean;
  searchTodo: string;
  isVisible: boolean;
  idTodo: string;
  isCreateProject: boolean;
  nameProject: string;
  idActiveProject: string;
  isSetting: boolean;
  setCreateTodo: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setIsInvalidEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUseEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordLength: React.Dispatch<React.SetStateAction<boolean>>;
  emailInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchTodo: React.Dispatch<React.SetStateAction<string>>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIdTodo: React.Dispatch<React.SetStateAction<string>>;
  setIsCreateProject: React.Dispatch<React.SetStateAction<boolean>>;
  nameProjectInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIdActiveProject: React.Dispatch<React.SetStateAction<string>>;
  setIsSetting: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [searchTodo, setSearchTodo] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [idTodo, setIdTodo] = useState<string>('');
  const [isCreateProject, setIsCreateProject] = useState<boolean>(false);
  const [nameProject, setNameProject] = useState<string>('');
  const [idActiveProject, setIdActiveProject] = useState<string>('');
  const [isSetting, setIsSetting] = useState<boolean>(false);

  const nameProjectInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameProject(event.target.value);
  };

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
        passwordInputHandler,
        setSearchTodo,
        searchTodo,
        isVisible,
        setIsVisible,
        idTodo,
        setIdTodo,
        isCreateProject,
        setIsCreateProject,
        nameProject,
        nameProjectInputHandler,
        idActiveProject,
        setIdActiveProject,
        isSetting,
        setIsSetting
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
