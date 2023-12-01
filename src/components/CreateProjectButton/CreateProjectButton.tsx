import React from 'react';
import { CreateProjectButtonWrapper } from './CreateProjectButtonStyled';

interface ICreateProjectButton {
  children: React.ReactNode;
  setIsMissProject: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProjectButton: React.FC<ICreateProjectButton> = ({ children, setIsMissProject }) => {
  const clickHandler = () => {
    setIsMissProject(true);
  };
  return <CreateProjectButtonWrapper onClick={clickHandler}>{children}</CreateProjectButtonWrapper>;
};

export default CreateProjectButton;
