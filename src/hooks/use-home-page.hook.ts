import React, { useState } from 'react';
import { useForm } from '../context';

interface IHomePageHook {
  idTarget: string;
  textareaValue: string;
  selectValue: string;
  titleValue: string;
  setIdTarget: React.Dispatch<React.SetStateAction<string>>;
  dragStartHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragEndHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragOverHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragEnterHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragLeaveHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragDropHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  createTodo?: boolean;
  setCreateTodo?: React.Dispatch<React.SetStateAction<boolean>>;
  closeButtonHandler: (event: React.MouseEvent) => void;
  titleInputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textareaChangeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  selectChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function useHomePage(): IHomePageHook {
  const { createTodo, setCreateTodo } = useForm();
  const [idTarget, setIdTarget] = useState<string>('');
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [selectValue, setSelectValue] = useState<string>('Low');
  const [titleValue, setTitleValue] = useState<string>('');

  const dragStartHandler = (event: React.DragEvent<HTMLDivElement>) => {
    setTimeout(() => {
      const target = event.target as HTMLDivElement;
      setIdTarget(target.id);
      target.classList.add('hidden');
    }, 0);
  };

  const dragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    target.classList.remove('hidden');
  };

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log('dragOver');
  };

  const dragEnterHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log('dragEnetr');
  };

  const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log('dragLeave');
  };

  const dragDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    const data = idTarget;
    const draggedElement = document.getElementById(data);
    const target = event.target as HTMLDivElement;

    if (draggedElement) {
      target.append(draggedElement);
    }
  };

  const closeButtonHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setCreateTodo(false);
  };

  const titleInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };
  const textareaChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
  };
  const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  return {
    idTarget,
    setIdTarget,
    dragStartHandler,
    dragEndHandler,
    dragOverHandler,
    dragEnterHandler,
    dragLeaveHandler,
    dragDropHandler,
    createTodo,
    setCreateTodo,
    closeButtonHandler,
    textareaChangeHandler,
    selectChangeHandler,
    titleInputChangeHandler,
    textareaValue,
    titleValue,
    selectValue
  };
}

export default useHomePage;
