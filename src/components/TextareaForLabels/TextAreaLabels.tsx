import React from 'react';
import { TextAreaForLabelsWrapper } from './TextareaForLabelsStyled';

interface ITextAreaLabels {
  onClickInLabels: () => void;
  onChangeLabels: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaLabels: React.FC<ITextAreaLabels> = ({ onClickInLabels, onChangeLabels }) => {
  return (
    <TextAreaForLabelsWrapper
      onClick={onClickInLabels}
      onChange={onChangeLabels}
      style={{ resize: 'none' }}
      cols={30}
      rows={1}
      placeholder="Labels"
    />
  );
};

export default TextAreaLabels;
