import React from 'react';
import { CreateProjectButtonWrapper } from './CreateProjectButtonStyled';

interface ICreateProjectButton {
  children: React.ReactNode;
  setIsCreateProject: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProjectButton: React.FC<ICreateProjectButton> = ({ children, setIsCreateProject }) => {
  const clickHandler = () => {
    setIsCreateProject(true);
  };
  return <CreateProjectButtonWrapper onClick={clickHandler}>{children}</CreateProjectButtonWrapper>;
};

export default CreateProjectButton;
