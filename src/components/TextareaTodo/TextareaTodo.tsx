import React from 'react';
import { TextareaTodoWrapper } from './TextareaTodoStyled';

interface ITodoPayload {
  status: string;
  title: string;
  description: string;
  importance: string;
  id: string;
}

interface ITextareaTodo {
  textareaChangeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  selectedTodo: ITodoPayload;
}

const TextareaTodo: React.FC<ITextareaTodo> = ({ textareaChangeHandler, selectedTodo }) => {
  return (
    <TextareaTodoWrapper
      style={{ resize: 'none' }}
      cols={30}
      rows={1}
      placeholder="Description"
      onChange={textareaChangeHandler}
      defaultValue={selectedTodo?.description || ''}
    />
  );
};

export default TextareaTodo;
