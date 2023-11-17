import React, { useEffect } from 'react';
import Header from '../components/Header';
import useHomePage from '../hooks/use-home-page.hook';
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
import { db } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import TodoSection from '../components/TodoSection';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, setTodo } from '../store/slices/todoSlice';
import { RootState } from '../store';
import { clearSelectedTodo } from '../store/slices/onClickTodoSlice';
import Popup from '../components/Popup';

function HomePage(): JSX.Element {
  const selectTodo = useSelector((state: RootState) => state.onClickTodoSlice.selectedTodo);
  const blocks = ['TO DO', 'IN PROGRESS', 'CODE REVIEW', 'DONE'];
  const email = localStorage.getItem('email');
  const {
    dragStartHandler,
    dragEndHandler,
    dragOverHandler,
    dragEnterHandler,
    dragLeaveHandler,
    dragDropHandler,
    createTodo,
    setCreateTodo,
    selectValue,
    titleValue,
    textareaValue,
    titleInputChangeHandler,
    textareaChangeHandler,
    selectChangeHandler,
    isLoaded,
    setIsLoaded,
    setTextareaValue,
    setTitleValue,
    setSelectValue
  } = useHomePage();
  const navigateToLoginPage = useNavigate();
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();

  const getDataHandler = async () => {
    dispatch(setTodo([]));
    const todoRef = collection(db, 'todo');
    const q = query(todoRef, where('Email', '==', `${email?.toLocaleLowerCase()}`));
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
    setIsLoaded(false);
  };

  const submitButtonHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    await addDoc(collection(db, 'todo'), {
      Title: `${titleValue}`,
      Description: `${textareaValue}`,
      Importance: `${selectValue}`,
      Email: `${email?.toLocaleLowerCase()}`,
      Status: 'TO DO'
    });
    getDataHandler();
    setIsLoaded(true);
    if (setCreateTodo) {
      setCreateTodo(false);
    }
  };

  const deleteButtonHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    await deleteDoc(doc(db, 'todo', `${selectTodo?.index}`));
    getDataHandler();
    dispatch(clearSelectedTodo());
    setIsLoaded(true);
  };

  const updateButtonHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    const updateDocRef = doc(db, 'todo', `${selectTodo?.index}`);
    await updateDoc(updateDocRef, {
      Title: titleValue ? titleValue : selectTodo?.title,
      Description: textareaValue ? textareaValue : selectTodo?.description,
      Importance: selectValue ? selectValue : selectTodo?.importance
    });

    getDataHandler();
    dispatch(clearSelectedTodo());
    setIsLoaded(true);
  };

  useEffect(() => {
    if (!user) {
      navigateToLoginPage('/login');
    }
  }, [user]);

  useEffect(() => {
    getDataHandler();
  }, []);

  useEffect(() => {
    if (setTextareaValue) {
      setTextareaValue('');
    }
    if (setTitleValue) {
      setTitleValue('');
    }
    if (setSelectValue) {
      setSelectValue('');
    }
  }, [createTodo, selectTodo]);

  return (
    <>
      <Header />
      <div className="flex py-2 px-4 items-center justify-center overflow-hidden w-screen h-screen relative">
        {isLoaded && <Loader />}
        {blocks.map((item, index) => {
          return (
            <TodoSection
              key={index}
              item={item}
              index={index}
              dragEnterHandler={dragEnterHandler}
              dragOverHandler={dragOverHandler}
              dragLeaveHandler={dragLeaveHandler}
              dragDropHandler={dragDropHandler}
              dragStartHandler={dragStartHandler}
              dragEndHandler={dragEndHandler}
            />
          );
        })}
        {createTodo && (
          <Popup
            titleInputChangeHandler={titleInputChangeHandler}
            textareaChangeHandler={textareaChangeHandler}
            selectChangeHandler={selectChangeHandler}
            setCreateTodo={setCreateTodo}
            createTodo={createTodo}
            selectValue={selectValue}
            submitButtonHandler={submitButtonHandler}
          />
        )}
        {selectTodo && (
          <Popup
            titleInputChangeHandler={titleInputChangeHandler}
            textareaChangeHandler={textareaChangeHandler}
            selectChangeHandler={selectChangeHandler}
            selectValue={selectValue}
            selectTodo={selectTodo}
            deleteButtonHandler={deleteButtonHandler}
            updateButtonHandler={updateButtonHandler}
          />
        )}
      </div>
    </>
  );
}

export default HomePage;
