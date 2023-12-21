import { TitleTodoWrapper } from './TitleTodoStyled';

interface ITitleTodo {
  children: React.ReactNode;
}

const TitleTodo: React.FC<ITitleTodo> = ({ children }) => {
  return <TitleTodoWrapper draggable={false}>{children}</TitleTodoWrapper>;
};

export default TitleTodo;
