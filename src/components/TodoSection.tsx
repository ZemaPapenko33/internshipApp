import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectFilteredTodos } from '../store/selectors/selectors';
import Todo from './Todo';

interface ITodoSectionProps {
  item: string;
  index: number;
  dragEnterHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragOverHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragLeaveHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragDropHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragStartHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragEndHandler: (event: React.DragEvent<HTMLDivElement>) => void;
}

const TodoSection: React.FC<ITodoSectionProps> = ({
  item,
  index,
  dragEnterHandler,
  dragOverHandler,
  dragLeaveHandler,
  dragDropHandler,
  dragStartHandler,
  dragEndHandler
}) => {
  const filterTodo = useSelector((state: RootState) => selectFilteredTodos(state, item));
  return (
    <div className="flex flex-col w-full h-full items-center justify-center py-10">
      <h1 className="bg-blue-200 shadow mb-2 px-4 w-[300px] text-center rounded">{item}</h1>
      <div
        key={index}
        className="rounded shadow-lg w-[300px] min-h-full bg-slate-100 py-1 px-4  overflow-y-scroll empty:overflow-y-hidden"
        onDragEnter={dragEnterHandler}
        onDragOver={dragOverHandler}
        onDragLeave={dragLeaveHandler}
        onDrop={dragDropHandler}
        data-status={item}
      >
        {filterTodo.map((newItem, newIndex) => {
          return (
            <Todo
              key={newIndex}
              index={newItem.id}
              status={newItem.status}
              title={newItem.title}
              description={newItem.description}
              importance={newItem.importance}
              dragStartHandler={dragStartHandler}
              dragEndHandler={dragEndHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodoSection;
