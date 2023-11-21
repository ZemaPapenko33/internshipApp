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
import Popup from '../components/Popup';
import { useForm } from '../context';
import { selectTodoById } from '../store/selectors/selectors';
import { RootState } from '../store';

function HomePage(): JSX.Element {
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
  const { isVisible, idTodo, setIsVisible } = useForm();
  const selectedTodo = useSelector((state: RootState) =>
    idTodo ? selectTodoById(idTodo)(state) : null
  );

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
    setIsVisible(false);
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

  const deleteButtonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await deleteDoc(doc(db, 'todo', idTodo));
    setIsLoaded(true);
    getDataHandler();
  };

  const updateButtonHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    const updateDocRef = doc(db, 'todo', `${idTodo}`);
    await updateDoc(updateDocRef, {
      Title: titleValue ? titleValue : selectedTodo?.title,
      Description: textareaValue ? textareaValue : selectedTodo?.description,
      Importance: selectValue ? selectValue : selectedTodo?.importance
    });

    getDataHandler();
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
    if (setSelectValue && selectedTodo) {
      setSelectValue(selectedTodo.importance);
    } else {
      setSelectValue!('Low');
    }
  }, [createTodo, isVisible]);

  return (
    <>
      <Header />
      <div className="flex py-2 px-4 items-center justify-center overflow-hidden w-screen h-screen relative">
        {isLoaded && <Loader />}
        {!isLoaded &&
          blocks.map((item, index) => {
            return (
              <TodoSection
                key={index}
                item={item}
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
        {isVisible && (
          <Popup
            titleInputChangeHandler={titleInputChangeHandler}
            textareaChangeHandler={textareaChangeHandler}
            selectChangeHandler={selectChangeHandler}
            selectValue={selectValue}
            deleteButtonHandler={deleteButtonHandler}
            updateButtonHandler={updateButtonHandler}
            selectedTodo={selectedTodo}
          />
        )}
      </div>
    </>
  );
}

export default HomePage;
