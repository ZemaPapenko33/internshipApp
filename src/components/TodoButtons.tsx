import React from 'react';
import DeleteButton from './DeleteButton/DeleteButton';
import { GreenButtonsWrapper } from './GreenButtons/GreenButtons';
import { RedButtonsWrapper } from './RedButtons/RedButtonsStyled';

interface ITodoButtons {
  createTodo: boolean;
  closeButtonHandlerByCreateTodo: () => void;
  updateButtonHandler?: (event: React.MouseEvent) => void;
  deleteButtonHandler?: (event: React.MouseEvent) => void;
  submitButtonHandler?: (event: React.MouseEvent) => void;
  isVisible: boolean;
  closeButtonHandlerByIsVisible: () => void;
}

const TodoButtons: React.FC<ITodoButtons> = ({
  createTodo,
  closeButtonHandlerByCreateTodo,
  submitButtonHandler,
  isVisible,
  closeButtonHandlerByIsVisible,
  deleteButtonHandler,
  updateButtonHandler
}) => {
  return (
    <>
      {createTodo && (
        <>
          <RedButtonsWrapper create="create" onClick={closeButtonHandlerByCreateTodo}>
            Close
          </RedButtonsWrapper>
          <GreenButtonsWrapper onClick={submitButtonHandler}>Submit</GreenButtonsWrapper>
        </>
      )}
      {isVisible && (
        <>
          <RedButtonsWrapper onClick={closeButtonHandlerByIsVisible}>Close</RedButtonsWrapper>
          <DeleteButton deleteButtonHandler={deleteButtonHandler!}>delete</DeleteButton>
          <GreenButtonsWrapper onClick={updateButtonHandler}>Update</GreenButtonsWrapper>
        </>
      )}
    </>
  );
};

export default TodoButtons;
