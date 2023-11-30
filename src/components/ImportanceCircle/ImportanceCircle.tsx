import React from 'react';
import { ImportanceCircleWrapper } from './ImportanceCircleStyled';

interface IImportanceCircle {
  color: string;
}

const ImportanceCircle: React.FC<IImportanceCircle> = ({ color }) => {
  return <ImportanceCircleWrapper color={color} />;
};

export default ImportanceCircle;
