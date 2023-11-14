import React from 'react';

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
  return (
    <div
      className="flex flex-col shadow-lg py-2 px-4 w-full h-[150px] bg-white mb-2 "
      draggable={true}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      id={`${index}`}
      data-status={status}
    >
      <h1>Title: {title}</h1>
      <p>Description: {description}</p>
      <p>Importance: {importance}</p>
    </div>
  );
};

export default Todo;
