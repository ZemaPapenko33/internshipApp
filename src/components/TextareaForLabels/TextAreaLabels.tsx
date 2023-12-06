import React from 'react';
import { useForm } from '../../context';
import { DeleteIcon } from '../deleteLabels/DeleteLabels';
import { LabelInTextareaWrapper } from '../LabelInTextarea/LabelInTextareaStyled';
import { TextAreaForLabelsWrapper } from './TextareaForLabelsStyled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface ITextAreaLabels {
  onClickInLabels: () => void;
  onChangeLabels: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextAreaLabels: React.FC<ITextAreaLabels> = ({ onClickInLabels, onChangeLabels }) => {
  const { selectedLabels, setSelectedLabels } = useForm();

  const deleteIconClickHandler = (id: string) => {
    const newSelectedLabels = selectedLabels.filter((label) => label.id !== id);
    setSelectedLabels(newSelectedLabels);
  };

  return (
    <TextAreaForLabelsWrapper onClick={onClickInLabels}>
      {selectedLabels.map((item, index) => {
        return (
          <LabelInTextareaWrapper key={index} contentEditable={false}>
            {item.name}
            <DeleteIcon icon={faXmark} onClick={() => deleteIconClickHandler(item.id)} />
          </LabelInTextareaWrapper>
        );
      })}
      <input
        type="text"
        onChange={onChangeLabels}
        placeholder="Labels..."
        className="h-[25px] focus: outline-none"
      />
    </TextAreaForLabelsWrapper>
  );
};

export default TextAreaLabels;
