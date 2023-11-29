import React, { useEffect } from 'react';
import useHomePage from '../hooks/use-home-page.hook';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/LoaderConfig/Loader';
import { useSelector } from 'react-redux';
import Popup from '../components/Popup';
import { useForm } from '../context';
import { selectTodoById } from '../store/selectors/selectors';
import { RootState } from '../store';
import Sidebar from '../components/Sidebar';
import PopupCreateProject from '../components/PopupCreateProject';
import Content from '../components/Content';
import Header from '../components/Header/Header';

function HomePage(): JSX.Element {
  const blocks = ['TO DO', 'IN PROGRESS', 'CODE REVIEW', 'DONE'];
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
    titleInputChangeHandler,
    textareaChangeHandler,
    selectChangeHandler,
    isLoading,
    setTextareaValue,
    setTitleValue,
    setSelectValue,
    submitButtonHandler,
    getDataHandler,
    getProjectData,
    updateButtonHandler,
    deleteButtonHandler
  } = useHomePage();
  const navigateToLoginPage = useNavigate();
  const user = localStorage.getItem('user');
  const { isVisible, todoId, isCreateProject, idActiveProject, isSetting } = useForm();
  const selectedTodo = useSelector((state: RootState) =>
    todoId ? selectTodoById(todoId)(state) : null
  );

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
