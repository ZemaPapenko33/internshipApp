import React, { useState, useEffect } from 'react';
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
  const [textareaRows, setTextareaRows] = useState<number>(1);

  useEffect(() => {
    if (selectedTodo) {
      const calculatedRows = Math.max(Math.ceil(selectedTodo.description.length / 30), 1);
      setTextareaRows(calculatedRows);
    }
  }, [selectedTodo]);

  return (
    <TextareaTodoWrapper
      style={{ resize: 'none' }}
      cols={45}
      rows={textareaRows}
      placeholder="Description"
      onChange={textareaChangeHandler}
      defaultValue={selectedTodo?.description || ''}
    />
  );
};

export default TextareaTodo;
