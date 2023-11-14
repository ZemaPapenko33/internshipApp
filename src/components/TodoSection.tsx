import React from 'react';

interface ITodoSectionProps {
  item: string;
  index: number;
  dragEnterHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragOverHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragLeaveHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragDropHandler: (event: React.DragEvent<HTMLDivElement>) => void;
}

const TodoSection: React.FC<ITodoSectionProps> = ({
  item,
  index,
  dragEnterHandler,
  dragOverHandler,
  dragLeaveHandler,
  dragDropHandler
}) => {
  return (
    <div
      key={index}
      className="rounded shadow-lg w-[300px] min-h-full bg-yellow-500 py-1 px-4 mr-10"
      onDragEnter={dragEnterHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dragDropHandler}
      data-status={item}
    >
      <h1 className="bg-white shadow-lg mb-2 px-4">{item}</h1>
    </div>
  );
};

export default TodoSection;
