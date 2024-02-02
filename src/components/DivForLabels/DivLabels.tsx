import React, { useCallback, useMemo } from 'react';
import { useForm } from '../../context';
import { DeleteIcon } from '../deleteLabels/DeleteLabels';
import { LabelInTextareaWrapper } from '../LabelInTextarea/LabelInTextareaStyled';
import { DivForLabelsWrapper } from './DivForLabelsStyled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { removeLabelById } from '../../store/slices/todoSlice';
import { InputForSearchLabelWrapper } from '../inputForSearchLabel/InputForSearchLabelStyled';
import { v4 as uuidv4 } from 'uuid';

interface ITodoPayload {
  status: string;
  title: string;
  description: string;
  importance: string;
  id: string;
  Labels: Array<string>;
}

interface ITextAreaLabels {
  onFocusInLabels: VoidFunction;
  onChangeLabels: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedTodo?: ITodoPayload | null;
}

const DivLabels: React.FC<ITextAreaLabels> = ({
  onFocusInLabels,
  onChangeLabels,
  selectedTodo
}) => {
  const { selectedLabels, setSelectedLabels } = useForm();
  const allLabels = useSelector((state: RootState) => state.labelsSlice.labels);
  const selectedTodoLabels = useMemo(() => {
    return allLabels.filter((label) => selectedTodo?.Labels?.includes(label.idLabel));
  }, [allLabels, selectedTodo]);
  const dispatch = useDispatch();

  const deleteIconClickHandler = useCallback(
    (id: string) => {
      const newSelectedLabels = selectedLabels.filter((label) => label.id !== id);
      if (selectedTodo) {
        dispatch(removeLabelById({ id: selectedTodo.id, labelId: id }));
      }
      setSelectedLabels(newSelectedLabels);
    },
    [selectedLabels, selectedTodo, dispatch]
  );

  return (
    <DivForLabelsWrapper onFocus={onFocusInLabels}>
      {selectedTodoLabels?.map((item) => {
        return (
          <LabelInTextareaWrapper key={uuidv4()} contentEditable={false}>
            {item.labelName}
            <DeleteIcon icon={faXmark} onClick={() => deleteIconClickHandler(item.idLabel)} />
          </LabelInTextareaWrapper>
        );
      })}
      {selectedLabels.map((item) => {
        return (
          <LabelInTextareaWrapper key={uuidv4()} contentEditable={false}>
            {item.name}
            <DeleteIcon icon={faXmark} onClick={() => deleteIconClickHandler(item.id)} />
          </LabelInTextareaWrapper>
        );
      })}
      <InputForSearchLabelWrapper
        type="text"
        onChange={onChangeLabels}
        placeholder={selectedLabels.length ? '' : 'Labels...'}
      />
    </DivForLabelsWrapper>
  );
};

export default DivLabels;
