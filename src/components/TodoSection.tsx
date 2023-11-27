import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../context';
import { RootState } from '../store';
import { selectFilteredTodos } from '../store/selectors/selectors';
import SectionName from './SectionName/SectionName';
import { SectionWrapper } from './SectionWrapper/SectionWrapperStyled';

import Todo from './TodoBlock/Todo';
import { TodoSectionBlock } from './TodoSectionBlock/TodoSectionBlock';

interface ITodoSectionProps {
  item: string;
  dragEnterHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragOverHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragLeaveHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragDropHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragStartHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragEndHandler: (event: React.DragEvent<HTMLDivElement>) => void;
}

const TodoSection: React.FC<ITodoSectionProps> = ({
  item,
  dragEnterHandler,
  dragOverHandler,
  dragLeaveHandler,
  dragDropHandler,
  dragStartHandler,
  dragEndHandler
}) => {
  const { searchTodo } = useForm();
  const filterTodo = useSelector((state: RootState) => selectFilteredTodos(state, item));
  const filteredTodos = searchTodo.length
    ? filterTodo.filter((todo) => todo.title.toLowerCase().includes(searchTodo.toLowerCase()))
    : filterTodo;

  return (
    <SectionWrapper>
      <SectionName>{item}</SectionName>
      <TodoSectionBlock
        item={item}
        dragDropHandler={dragDropHandler}
        dragEnterHandler={dragEnterHandler}
        dragLeaveHandler={dragLeaveHandler}
        dragOverHandler={dragOverHandler}
      >
        {filteredTodos.map((newItem) => {
          return (
            <Todo
              index={newItem.id}
              status={newItem.status}
              title={newItem.title}
              description={newItem.description}
              importance={newItem.importance}
              dragStartHandler={dragStartHandler}
              dragEndHandler={dragEndHandler}
              key={newItem.id}
            />
          );
        })}
      </TodoSectionBlock>
    </SectionWrapper>
  );
};

export default TodoSection;
