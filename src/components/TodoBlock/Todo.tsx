import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../context';
import { MAX_LABELS } from '../../shared/consts/labels';
import { EnumImportance } from '../../shared/enum';
import { RootState } from '../../store';
import DescriptionTodo from '../DescriptionTodo/DescriptionTodo';
import ImportanceCircle from '../ImportanceCircle/ImportanceCircle';
import { LabelInTextareaWrapper } from '../LabelInTextarea/LabelInTextareaStyled';
import TitleTodo from '../TitleTodo/TitleTodo';
import { TodoBlockWrapper } from './TodoBlockStyled';
import { v4 as uuid4v } from 'uuid';

interface ITodo {
  index: string;
  status: string;
  title: string;
  description: string;
  importance: string;
  labels: string[];
  dragStartHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragEndHandler: (event: React.DragEvent<HTMLDivElement>) => void;
}

interface ILabelsPayload {
  labelName: string;
  idLabel: string;
}

const Todo: React.FC<ITodo> = ({
  index,
  status,
  title,
  description,
  importance,
  labels,
  dragStartHandler,
  dragEndHandler
}) => {
  const { setIsVisible, setTodoId } = useForm();
  const allLabels = useSelector((state: RootState) => state.labelsSlice.labels);
  const filteredLabels = useMemo(() => {
    return allLabels.reduce((acc, label) => {
      if (labels?.includes(label.idLabel) && acc.length < MAX_LABELS) {
        acc.push(label);
      }
      return acc;
    }, [] as Array<ILabelsPayload>);
  }, [allLabels, labels]);

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
      <TitleTodo>
        {title} <ImportanceCircle color={color} />
      </TitleTodo>
      <DescriptionTodo>{description}</DescriptionTodo>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis flex">
        {filteredLabels.map((item) => {
          return <LabelInTextareaWrapper key={uuid4v()}>{item.labelName}</LabelInTextareaWrapper>;
        })}
        {filteredLabels.length ? '...' : null}
      </div>
    </TodoBlockWrapper>
  );
};

export default Todo;
