import React from 'react';
import { useForm } from '../../context';
import { EnumImportance } from '../../shared/consts/enum';
import DescriptionTodo from '../DescriptionTodo/DescriptionTodo';
import TitleTodo from '../TitleTodo/TitleTodo';
import { TodoBlockWrapper } from './TodoBlockStyled';

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
  const getColor = (importances: string): string => {
    switch (importances) {
      case `${EnumImportance.LOW}`:
        return 'green';
      case `${EnumImportance.MEDIUM}`:
        return 'yellow';
      case `${EnumImportance.HIGH}`:
        return 'red';
      default:
        return 'green';
    }
  };

  const color = getColor(importance);

  const onClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsVisible(true);
    setTodoId(index);
  };
  return (
    <TodoBlockWrapper
      draggable={true}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      id={index}
      data-status={status}
      onClick={onClickHandler}
    >
      <DescriptionTodo>{description}</DescriptionTodo>
      <TitleTodo color={color}>{title}</TitleTodo>
    </TodoBlockWrapper>
  );
};

export default Todo;
