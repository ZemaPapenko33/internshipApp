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
  labelsFiltered: ILabelsPayload[];
}

const Labels: React.FC<ILabels> = ({ labelsFiltered, onClickLabels, onClickNewLabel }) => {
  const { searchLabel } = useForm();
  return (
    <LabelWrapper>
      {labelsFiltered.length ? (
        labelsFiltered.map((item, index) => {
          return (
            <LabelInTextareaWrapper
              key={index}
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
