import React from 'react';
import { useForm } from '../../context';
import { DeleteIcon } from '../deleteLabels/DeleteLabels';
import { LabelInTextareaWrapper } from '../LabelInTextarea/LabelInTextareaStyled';
import { DivForLabelsWrapper } from './DivForLabelsStyled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { removeLabelById } from '../../store/slices/todoSlice';
import { InputForSearchLabelWrapper } from '../inputForSearchLabel/InputForSearchLabelStyled';

interface ITodoPayload {
  status: string;
  title: string;
  description: string;
  importance: string;
  id: string;
  Labels: string[];
}

interface ITextAreaLabels {
  onFocusInLabels: () => void;
  onBlurInLabels: () => void;
  onChangeLabels: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedTodo?: ITodoPayload | null;
}

const DivLabels: React.FC<ITextAreaLabels> = ({
  onFocusInLabels,
  onChangeLabels,
  // onBlurInLabels,
  selectedTodo
}) => {
  const { selectedLabels, setSelectedLabels } = useForm();
  const allLabels = useSelector((state: RootState) => state.labelsSlice.labels);
  const selectedTodoLabels = allLabels.filter(
    (label) => selectedTodo?.Labels?.includes(label.idLabel)
  );
  const dispatch = useDispatch();

  const deleteIconClickHandler = (id: string) => {
    const newSelectedLabels = selectedLabels.filter((label) => label.id !== id);
    if (selectedTodo) {
      dispatch(removeLabelById({ id: selectedTodo.id, labelId: id }));
    }
    setSelectedLabels(newSelectedLabels);
  };

  return (
    <DivForLabelsWrapper onFocus={onFocusInLabels}>
      {selectedTodoLabels?.map((item, index) => {
        return (
          <LabelInTextareaWrapper key={index} contentEditable={false}>
            {item.labelName}
            <DeleteIcon icon={faXmark} onClick={() => deleteIconClickHandler(item.idLabel)} />
          </LabelInTextareaWrapper>
        );
      })}
      {selectedLabels.map((item, index) => {
        return (
          <LabelInTextareaWrapper key={index} contentEditable={false}>
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
