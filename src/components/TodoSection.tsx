import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../context';
import { RootState } from '../store';
import { selectFilteredTodos } from '../store/selectors/selectors';

import Todo from './TodoBlock/Todo';

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
    <div className="flex flex-col h-screen w-[250px] items-center justify-center mr-5  py-5">
      <h1 className="bg-blue-200 shadow mb-2 px-4 w-[250px] text-center rounded select-none">
        {item}
      </h1>
      <div
        className="rounded shadow-lg w-[250px] h-full bg-slate-100 py-1 px-4  overflow-y-scroll empty:overflow-y-hidden"
        onDragEnter={dragEnterHandler}
        onDragOver={dragOverHandler}
        onDragLeave={dragLeaveHandler}
        onDrop={dragDropHandler}
        data-status={item}
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
      </div>
    </div>
  );
};

export default TodoSection;
