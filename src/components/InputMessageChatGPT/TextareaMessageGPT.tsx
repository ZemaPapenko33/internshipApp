import React from 'react';
import { TextareaMessageWrapper } from './TextareaMessageStyled';

interface ITextareaMessage {
  onChangeMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyPress: (event: React.KeyboardEvent) => void;
  questionChatGPT: string;
}

const TextareaMessageGPT: React.FC<ITextareaMessage> = ({
  onChangeMessage,
  handleKeyPress,
  questionChatGPT
}) => {
  return (
    <TextareaMessageWrapper
      placeholder="Message chatGPT..."
      onChange={onChangeMessage}
      onKeyPress={handleKeyPress}
      value={questionChatGPT}
    />
  );
};

export default TextareaMessageGPT;
