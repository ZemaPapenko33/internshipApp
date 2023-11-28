import React from 'react';

interface ITodoButtons {
  createTodo: boolean;
  closeButtonHandlerByCreateTodo: () => void;
  updateButtonHandler?: (event: React.MouseEvent) => void;
  deleteButtonHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
    <div>
      {createTodo && (
        <>
          <button
            className="mr-2 shadow-lg bg-red-500 text-white rounded border-2 w-[100px]"
            onClick={closeButtonHandlerByCreateTodo}
          >
            Close
          </button>
          <button
            className="shadow-lg rounded border-2 w-[100px] bg-green-500 text-white"
            onClick={submitButtonHandler}
          >
            Submit
          </button>
        </>
      )}
      {isVisible && (
        <>
          <button
            className="mr-2 shadow-lg bg-white text-black rounded border-2 border-red-500 w-[100px]"
            onClick={closeButtonHandlerByIsVisible}
          >
            Close
          </button>
          <button
            className="mr-2 shadow-lg bg-red-500 text-white rounded border-2 w-[100px]"
            onClick={deleteButtonHandler}
          >
            delete
          </button>
          <button
            className="shadow-lg rounded border-2 w-[100px] bg-green-500 text-white"
            onClick={updateButtonHandler}
          >
            Update
          </button>
        </>
      )}
    </div>
  );
};

export default TodoButtons;
