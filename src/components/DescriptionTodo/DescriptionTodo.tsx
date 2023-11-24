import React from 'react';
import { DescriptionTodoWrapper } from './DescriptionTodoStyled';

interface IDescriptionTodo {
  children: React.ReactNode;
}

const DescriptionTodo: React.FC<IDescriptionTodo> = ({ children }) => {
  return <DescriptionTodoWrapper>{children}</DescriptionTodoWrapper>;
};

export default DescriptionTodo;
