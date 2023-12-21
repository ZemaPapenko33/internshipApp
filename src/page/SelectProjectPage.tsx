import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Content from '../components/Content';
import Header from '../components/Header/Header';
import Loader from '../components/LoaderConfig/Loader';
import Popup from '../components/Popup';
import PopupCreateProject from '../components/PopupCreateProject';
import Sidebar from '../components/Sidebar';
import { useForm } from '../context';
import useProjectPage from '../hooks/use-project-page.hook';
import { RootState } from '../store';
import { selectTodoById } from '../store/selectors/selectors';

function SelectProjectPage() {
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
    submitButtonHandler,
    getProjectData,
    updateButtonHandler,
    deleteButtonHandler,
    getDataHandler,
    setTextareaValue,
    setTitleValue,
    setSelectValue
  } = useProjectPage();
  const { isVisible, todoId, isCreateProject, idActiveProject, isSetting } = useForm();
  const blocks = ['TO DO', 'IN PROGRESS', 'CODE REVIEW', 'DONE'];
  const selectedTodo = useSelector((state: RootState) =>
    todoId ? selectTodoById(todoId)(state) : null
  );

  useEffect(() => {
    getDataHandler();
  }, [idActiveProject]);

  useEffect(() => {
    getProjectData();
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
    <div className="overscroll-x-none overflow-x-hidden">
      <Header value="Project" />
      <div className="flex py-2  items-center  overflow-hidden w-screen h-screen relative ">
        <Sidebar />
        {isLoading ? (
          <Loader />
        ) : idActiveProject ? (
          <Content
            blocks={blocks}
            dragDropHandler={dragDropHandler}
            dragEndHandler={dragEndHandler}
            dragStartHandler={dragStartHandler}
            dragOverHandler={dragOverHandler}
            dragEnterHandler={dragEnterHandler}
            dragLeaveHandler={dragLeaveHandler}
          />
        ) : (
          <div></div>
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

export default SelectProjectPage;
