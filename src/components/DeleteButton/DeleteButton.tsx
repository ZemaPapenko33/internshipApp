import React from 'react';
import { DeleteButtonWrapper } from './DeleteButtonStyled';

interface IDeleteButton {
  children: React.ReactNode;
  deleteButtonHandler: (event: React.MouseEvent) => void;
}

const DeleteButton: React.FC<IDeleteButton> = ({ children, deleteButtonHandler }) => {
  return <DeleteButtonWrapper onClick={deleteButtonHandler}>{children}</DeleteButtonWrapper>;
};

export default DeleteButton;
