import React from 'react';
import { CreateProjectButtonWrapper } from './CreateProjectButtonStyled';

interface ICreateProjectButton {
  children: React.ReactNode;
  setIsCreateProject: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProjectButton: React.FC<ICreateProjectButton> = ({ children, setIsCreateProject }) => {
  const onClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsCreateProject(true);
  };
  return (
    <CreateProjectButtonWrapper onClick={onClickHandler}>{children}</CreateProjectButtonWrapper>
  );
};

export default CreateProjectButton;
