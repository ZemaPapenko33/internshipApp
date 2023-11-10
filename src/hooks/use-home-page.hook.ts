import React, { useState } from 'react';
import { useForm } from '../context';

interface IHomePageHook {
  idTarget: string;
  setIdTarget: React.Dispatch<React.SetStateAction<string>>;
  dragStartHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragEndHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragOverHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragEnterHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragLeaveHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragDropHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  createTodo?: boolean;
  setCreateTodo?: React.Dispatch<React.SetStateAction<boolean>>;
}

function useHomePage(): IHomePageHook {
  const { createTodo, setCreateTodo } = useForm();
  const [idTarget, setIdTarget] = useState('');
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
    setCreateTodo
  };
}

export default useHomePage;
