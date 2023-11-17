import React from 'react';
import { useDispatch } from 'react-redux';

import { clearSelectedTodo, selectTodo } from '../store/slices/onClickTodoSlice';

interface ITodo {
  index: string;
  status: string;
  title: string;
  description: string;
  importance: string;
  dragStartHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragEndHandler: (event: React.DragEvent<HTMLDivElement>) => void;
}

const Todo: React.FC<ITodo> = ({
  index,
  status,
  title,
  description,
  importance,
  dragStartHandler,
  dragEndHandler
}) => {
  const borderLeftStyle = {
    borderLeft:
      status === 'Назначено'
        ? '10px solid red'
        : status === 'В процессе'
        ? '10px solid yellow'
        : 'none'
  };
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(clearSelectedTodo());
    const todoPayload = {
      index,
      status,
      title,
      description,
      importance
    };
    dispatch(selectTodo(todoPayload));
  };
  return (
    <div
      className="flex flex-col shadow-lg py-2 px-4 w-full h-[100px] bg-white mb-2 rounded "
      draggable={true}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      id={index}
      data-status={status}
      style={borderLeftStyle}
      onClick={onClickHandler}
    >
      <h1>Title: {title}</h1>
      <p>Description: {description}</p>
      <p>Importance: {importance}</p>
    </div>
  );
};

export default Todo;
