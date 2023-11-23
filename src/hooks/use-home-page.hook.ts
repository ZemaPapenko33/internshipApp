import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useForm } from '../context';
import { db } from '../firebase/firebaseConfig';
import { EnumImportance } from '../shared/consts/enum';

interface IHomePageHook {
  idTarget: string;
  textareaValue: string;
  selectValue: string;
  titleValue: string;
  isLoaded: boolean;
  setIdTarget: React.Dispatch<React.SetStateAction<string>>;
  dragStartHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragEndHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragOverHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragEnterHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragLeaveHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  dragDropHandler: (event: React.DragEvent<HTMLDivElement>) => void;
  createTodo?: boolean;
  setCreateTodo?: React.Dispatch<React.SetStateAction<boolean>>;
  titleInputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textareaChangeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  selectChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

function useHomePage(): IHomePageHook {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const { createTodo, setCreateTodo } = useForm();
  const [idTarget, setIdTarget] = useState<string>('');
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [selectValue, setSelectValue] = useState<string>(EnumImportance.LOW);
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
  };

  const dragEnterHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const dragDropHandler = async (event: React.DragEvent<HTMLDivElement>) => {
    const data = idTarget;
    const draggedElement = document.getElementById(data);
    const target = event.target as HTMLDivElement;
    const dataStatus = target.getAttribute('data-status');
    if (dataStatus == 'Закончен') {
      draggedElement?.classList.remove('bg-white');
      draggedElement?.classList.add('bg-gray-500');
      draggedElement?.classList.add('line-through');
    } else {
      draggedElement?.classList.remove('line-through');
      draggedElement?.classList.remove('bg-gray-500');
      draggedElement?.classList.add('bg-white');
    }
    if (draggedElement) {
      target.append(draggedElement);
    }
    const id = draggedElement?.id as string;
    const updateDocRef = doc(db, 'todo', id);
    await updateDoc(updateDocRef, {
      Status: `${dataStatus}`
    });
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
    textareaChangeHandler,
    selectChangeHandler,
    titleInputChangeHandler,
    textareaValue,
    titleValue,
    selectValue,
    isLoaded,
    setIsLoaded
  };
}

export default useHomePage;
