import React from 'react';
import { useForm } from '../context';
import { EnumImportance } from '../shared/consts/enum';

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
  const { setIsVisible, setTodoId } = useForm();
  const background = {
    background:
      importance === EnumImportance.LOW
        ? 'green'
        : importance === EnumImportance.MEDIUM
        ? 'yellow'
        : 'red'
  };

  const onClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsVisible(true);
    setTodoId(index);
  };
  return (
    <div
      className="flex flex-col shadow-lg py-2 px-4 w-full min-h-[80px] bg-white mb-2 rounded "
      draggable={true}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      id={index}
      data-status={status}
      onClick={onClickHandler}
    >
      <p className="mb-2 font-medium">{description}</p>
      <h1 style={background} className="px-1 w-full">
        {title}
      </h1>
    </div>
  );
};

export default Todo;
