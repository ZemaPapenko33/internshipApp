import React from 'react';
import DeleteButton from './DeleteButton/DeleteButton';
import { GreenButtonsWrapper } from './GreenButtons/GreenButtons';

interface ITodoButtons {
  createTodo: boolean;
  updateButtonHandler?: (event: React.MouseEvent) => void;
  deleteButtonHandler?: (event: React.MouseEvent) => void;
  submitButtonHandler?: (event: React.MouseEvent) => void;
  isVisible: boolean;
}

const TodoButtons: React.FC<ITodoButtons> = ({
  createTodo,
  submitButtonHandler,
  isVisible,
  deleteButtonHandler,
  updateButtonHandler
}) => {
  return (
    <>
      {createTodo && (
        <div>
          <GreenButtonsWrapper onClick={submitButtonHandler}>Submit</GreenButtonsWrapper>
        </div>
      )}
      {isVisible && (
        <div>
          <DeleteButton deleteButtonHandler={deleteButtonHandler!}>Delete</DeleteButton>
          <GreenButtonsWrapper onClick={updateButtonHandler}>Update</GreenButtonsWrapper>
        </div>
      )}
    </>
  );
};

export default TodoButtons;
