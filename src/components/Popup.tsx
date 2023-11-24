import React from 'react';
import { useForm } from '../context';
import { EnumImportance } from '../shared/consts/enum';

interface ITodoPayload {
  status: string;
  title: string;
  description: string;
  importance: string;
  id: string;
}

interface IPopup {
  titleInputChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textareaChangeHandler?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  selectChangeHandler?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setCreateTodo?: React.Dispatch<React.SetStateAction<boolean>>;
  createTodo?: boolean;
  updateButtonHandler?: (event: React.MouseEvent) => void;
  deleteButtonHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  submitButtonHandler?: (event: React.MouseEvent) => void;
  selectValue?: string;
  selectedTodo?: ITodoPayload | null;
}

const Popup: React.FC<IPopup> = ({
  titleInputChangeHandler,
  textareaChangeHandler,
  selectChangeHandler,
  deleteButtonHandler,
  updateButtonHandler,
  createTodo,
  setCreateTodo,
  submitButtonHandler,
  selectValue,
  selectedTodo
}) => {
  const { setIsVisible, isVisible, setTodoId } = useForm();

  const closeButtonHandlerByIsVisible = () => {
    setIsVisible(false);
    setTodoId('');
  };

  const closeButtonHandlerByCreateTodo = () => {
    if (setCreateTodo) {
      setCreateTodo(false);
    }
  };

  return (
    <div className="flex items-center w-screen h-screen bg-black absolute justify-center bg-opacity-50">
      <div className="flex flex-col py-2 px-4 items-center justify-center bg-white w-[350px] h-[350px] rounded  ">
        <form className="flex flex-col items-start justify-center py-4 px-4 w-[350px] h-[350px]">
          <input
            type="text"
            placeholder="Title"
            className="mb-2 shadow-lg rounded border-2 h-[30px] px-2 py-2"
            onChange={titleInputChangeHandler}
            defaultValue={selectedTodo?.title || ''}
          />
          <textarea
            className="mb-2 shadow-lg rounded border-2"
            style={{ resize: 'none' }}
            cols={30}
            rows={3}
            placeholder="Description"
            onChange={textareaChangeHandler}
            defaultValue={selectedTodo?.description || ''}
          />
          <select
            className="shadow-lg rounded border-2 mb-4"
            onChange={selectChangeHandler}
            value={selectValue}
            defaultValue={EnumImportance.LOW}
          >
            <option value={EnumImportance.LOW}>Low</option>
            <option value={EnumImportance.MEDIUM}>Medium</option>
            <option value={EnumImportance.HIGH}>High</option>
          </select>
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
        </form>
      </div>
    </div>
  );
};

export default Popup;
