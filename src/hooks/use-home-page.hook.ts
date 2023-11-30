import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../context';
import { db } from '../firebase/firebaseConfig';
import { EnumImportance } from '../shared/enum';
import { RootState } from '../store';
import { selectTodoById } from '../store/selectors/selectors';
import { addProject, setProject } from '../store/slices/projectSlice';
import { addTodo, setTodo, updateStatusById } from '../store/slices/todoSlice';

interface IHomePageHook {
  idTarget: string;
  textareaValue: string;
  selectValue: string;
  titleValue: string;
  isLoading: boolean;
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
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTitleValue?: React.Dispatch<React.SetStateAction<string>>;
  setTextareaValue?: React.Dispatch<React.SetStateAction<string>>;
  setSelectValue?: React.Dispatch<React.SetStateAction<string>>;
  submitButtonHandler: (event: React.MouseEvent) => void;
  getDataHandler: () => Promise<void>;
  getProjectData: () => Promise<void>;
  updateButtonHandler: (event: React.MouseEvent) => void;
  deleteButtonHandler: (event: React.MouseEvent) => void;
}

function useHomePage(): IHomePageHook {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    createTodo,
    setCreateTodo,
    idActiveProject,
    setIsVisible,
    todoId,
    nameProject,
    setIdActiveProject
  } = useForm();
  const [idTarget, setIdTarget] = useState<string>('');
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [selectValue, setSelectValue] = useState<string>(EnumImportance.LOW);
  const [titleValue, setTitleValue] = useState<string>('');
  const dispatch = useDispatch();
  const email = localStorage.getItem('email');
  const selectedTodo = useSelector((state: RootState) => selectTodoById(todoId)(state));

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

    const id = draggedElement?.id as string;
    dispatch(updateStatusById({ id, dataStatus: `${dataStatus}` }));
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

  const getDataHandler = async () => {
    dispatch(setTodo([]));
    const todoRef = collection(db, 'todo');
    const q = query(
      todoRef,
      where('Email', '==', `${email?.toLocaleLowerCase()}`),
      where('ProjectId', '==', `${idActiveProject}`)
    );
    const Snapshot = await getDocs(q);
    Snapshot.forEach((docs) => {
      const { Title, Description, Importance, Status } = docs.data();
      const todo = {
        title: Title,
        description: Description,
        importance: Importance,
        status: Status,
        id: docs.id
      };
      dispatch(addTodo(todo));
    });
    setIsLoading(false);
    setIsVisible(false);
  };

  const submitButtonHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (textareaValue && titleValue) {
      await addDoc(collection(db, 'todo'), {
        Title: `${titleValue}`,
        Description: `${textareaValue}`,
        Importance: `${selectValue}`,
        Email: `${email?.toLocaleLowerCase()}`,
        Status: 'TO DO',
        ProjectId: idActiveProject
      });
      getDataHandler();
      setIsLoading(true);
      if (setCreateTodo) {
        setCreateTodo(false);
      }
    } else {
      alert('Пожалуйста, заполните все поля');
    }
  };

  const getProjectData = async () => {
    dispatch(setProject([]));
    const projectRef = collection(db, 'projects');
    const q = query(projectRef, where('email', '==', `${email?.toLocaleLowerCase()}`));
    const Snapshot = await getDocs(q);
    Snapshot.forEach((docs) => {
      const { name } = docs.data();
      if (!idActiveProject && name === nameProject) {
        setIdActiveProject(`${docs.id}`);
      }
      const project = {
        name: name,
        id: docs.id
      };
      dispatch(addProject(project));
    });
    setIsLoading(false);
  };

  const updateButtonHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    const updateDocRef = doc(db, 'todo', `${todoId}`);
    await updateDoc(updateDocRef, {
      Title: titleValue ? titleValue : selectedTodo?.title,
      Description: textareaValue ? textareaValue : selectedTodo?.description,
      Importance: selectValue ? selectValue : selectedTodo?.importance
    });

    getDataHandler();
    setIsLoading(true);
  };

  const deleteButtonHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    await deleteDoc(doc(db, 'todo', todoId));
    setIsLoading(true);
    getDataHandler();
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
    isLoading,
    setIsLoading,
    setTextareaValue,
    setTitleValue,
    setSelectValue,
    submitButtonHandler,
    getDataHandler,
    getProjectData,
    updateButtonHandler,
    deleteButtonHandler
  };
}

export default useHomePage;
