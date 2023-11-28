import { TitleTodoInputWrapper } from './TitleTodoInputStyled';

interface ITodoPayload {
  status: string;
  title: string;
  description: string;
  importance: string;
  id: string;
}

interface ITitleTodoInput {
  titleInputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedTodo: ITodoPayload;
}

const TitleTodoInput: React.FC<ITitleTodoInput> = ({ titleInputChangeHandler, selectedTodo }) => {
  return (
    <TitleTodoInputWrapper
      type="text"
      placeholder="Title"
      className="mb-2 shadow-lg rounded border-2 h-[30px] px-2 py-2"
      onChange={titleInputChangeHandler}
      defaultValue={selectedTodo?.title || ''}
    />
  );
};

export default TitleTodoInput;
