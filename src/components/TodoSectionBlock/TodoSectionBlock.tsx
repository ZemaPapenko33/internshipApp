import { TodoSectionBlockWrapper } from './TodoSectionStyled';

interface ITodoSectionBLock {
  children: React.ReactNode;
  item: string;
  dragEnterHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragOverHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragLeaveHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragDropHandler: (event: React.DragEvent<HTMLDivElement>) => void;
}

export const TodoSectionBlock: React.FC<ITodoSectionBLock> = ({
  children,
  item,
  dragEnterHandler,
  dragOverHandler,
  dragLeaveHandler,
  dragDropHandler
}) => {
  return (
    <TodoSectionBlockWrapper
      onDragEnter={dragEnterHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dragDropHandler}
      data-status={item}
    >
      {children}
    </TodoSectionBlockWrapper>
  );
};
