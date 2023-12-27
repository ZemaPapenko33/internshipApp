import React from 'react';
import { TextareaMessageWrapper } from './TextareaMessageStyled';

interface ITextareaMessage {
  onChangeMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyPress: (event: React.KeyboardEvent) => void;
}

const TextareaMessageGPT: React.FC<ITextareaMessage> = ({ onChangeMessage, handleKeyPress }) => {
  return (
    <TextareaMessageWrapper
      placeholder="Message chatGPT..."
      onChange={onChangeMessage}
      onKeyPress={handleKeyPress}
    />
  );
};

export default TextareaMessageGPT;
