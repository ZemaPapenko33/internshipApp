import React from 'react';
import { InputMessageWrapper } from './InputMessageStyled';

interface IInputMessage {
  onChangeMessage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputMessageGPT: React.FC<IInputMessage> = ({ onChangeMessage }) => {
  return (
    <InputMessageWrapper type="text" placeholder="Message chatGPT..." onChange={onChangeMessage} />
  );
};

export default InputMessageGPT;
