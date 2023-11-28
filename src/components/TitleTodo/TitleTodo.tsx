import { TitleTodoWrapper } from './TitleTodoStyled';

interface ITitleTodo {
  color: string;
  children: React.ReactNode;
}

const TitleTodo: React.FC<ITitleTodo> = ({ color, children }) => {
  return <TitleTodoWrapper color={color}> {children}</TitleTodoWrapper>;
};

export default TitleTodo;
