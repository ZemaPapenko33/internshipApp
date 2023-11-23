import React from 'react';
import TodoSection from './TodoSection';

interface IContent {
  blocks: string[];
  dragEnterHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragOverHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragLeaveHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragDropHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragStartHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragEndHandler: (event: React.DragEvent<HTMLDivElement>) => void;
}

const Content: React.FC<IContent> = ({
  blocks,
  dragEnterHandler,
  dragOverHandler,
  dragLeaveHandler,
  dragDropHandler,
  dragStartHandler,
  dragEndHandler
}) => {
  return (
    <>
      {blocks.map((item: string, index: number) => {
        return (
          <TodoSection
            key={index}
            item={item}
            dragEnterHandler={dragEnterHandler}
            dragOverHandler={dragOverHandler}
            dragLeaveHandler={dragLeaveHandler}
            dragDropHandler={dragDropHandler}
            dragStartHandler={dragStartHandler}
            dragEndHandler={dragEndHandler}
          />
        );
      })}
    </>
  );
};

export default Content;
