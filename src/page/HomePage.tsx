import React, { useEffect } from 'react';
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
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, setTodo } from '../store/slices/todoSlice';
import Popup from '../components/Popup';
import { useForm } from '../context';
import { selectTodoById } from '../store/selectors/selectors';
import { RootState } from '../store';
import Sidebar from '../components/Sidebar';
import PopupCreateProject from '../components/PopupCreateProject';
import { addProject, setProject } from '../store/slices/projectSlice';
import Content from '../components/Content';
import Header from '../components/Header/Header';

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
    isLoading,
    setIsLoading,
    setTextareaValue,
    setTitleValue,
    setSelectValue
  } = useHomePage();
  const navigateToLoginPage = useNavigate();
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();
  const { isVisible, todoId, setIsVisible, isCreateProject, idActiveProject, isSetting } =
    useForm();
  const selectedTodo = useSelector((state: RootState) =>
    todoId ? selectTodoById(todoId)(state) : null
  );

  const getProjectData = async () => {
    dispatch(setProject([]));
    const projectRef = collection(db, 'projects');
    const q = query(projectRef, where('email', '==', `${email?.toLocaleLowerCase()}`));
    const Snapshot = await getDocs(q);
    Snapshot.forEach((docs) => {
      const { name } = docs.data();
      const project = {
        name: name,
        id: docs.id
      };
      dispatch(addProject(project));
    });
    setIsLoading(false);
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
  };

  const deleteButtonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await deleteDoc(doc(db, 'todo', todoId));
    setIsLoading(true);
    getDataHandler();
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

  useEffect(() => {
    if (!user) {
      navigateToLoginPage('/login');
    }
  }, [user]);

  useEffect(() => {
    getProjectData();
  }, []);

  useEffect(() => {
    getDataHandler();
  }, [idActiveProject]);

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
    <div className="overscroll-x-none overflow-x-hidden">
      <Header />
      <div className="flex py-2  items-center  overflow-hidden w-screen h-screen relative ">
        <Sidebar />
        {isLoading ? (
          <Loader />
        ) : (
          <Content
            blocks={blocks}
            dragDropHandler={dragDropHandler}
            dragEndHandler={dragEndHandler}
            dragStartHandler={dragStartHandler}
            dragOverHandler={dragOverHandler}
            dragEnterHandler={dragEnterHandler}
            dragLeaveHandler={dragLeaveHandler}
          />
        )}

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
        {isCreateProject && <PopupCreateProject getProjectData={getProjectData} />}
        {isSetting && <PopupCreateProject getProjectData={getProjectData} />}
      </div>
    </div>
  );
}

export default HomePage;
