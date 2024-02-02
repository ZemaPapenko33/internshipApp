import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { useForm } from '../../context';
import { LabelInTextareaWrapper } from '../LabelInTextarea/LabelInTextareaStyled';
import { LabelWrapper } from './LabelsStyled';

interface ILabelsPayload {
  labelName: string;
  idLabel: string;
}

interface ILabels {
  onClickLabels: (item: { name: string; id: string }) => void;
  onClickNewLabel: () => Promise<void>;
  labelsFiltered: Array<ILabelsPayload>;
}

const Labels: React.FC<ILabels> = ({ labelsFiltered, onClickLabels, onClickNewLabel }) => {
  const { searchLabel } = useForm();

  return (
    <LabelWrapper>
      {labelsFiltered.length ? (
        labelsFiltered.map((item) => {
          return (
            <LabelInTextareaWrapper
              key={uuidv4()}
              onClick={() => onClickLabels({ name: item.labelName, id: item.idLabel })}
            >
              {item.labelName}
            </LabelInTextareaWrapper>
          );
        })
      ) : (
        <LabelInTextareaWrapper onClick={onClickNewLabel}>{searchLabel}</LabelInTextareaWrapper>
      )}
    </LabelWrapper>
  );
};

export default Labels;
