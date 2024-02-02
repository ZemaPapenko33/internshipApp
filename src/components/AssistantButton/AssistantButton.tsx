import React from 'react';
import { AssistantButtonWrapper } from './AssistantButtonStyled';

interface IAssistantButton {
  assistantHandler: VoidFunction;
}

const AssistantButton: React.FC<IAssistantButton> = ({ assistantHandler }) => {
  return <AssistantButtonWrapper onClick={assistantHandler}>Assistant</AssistantButtonWrapper>;
};

export default AssistantButton;
