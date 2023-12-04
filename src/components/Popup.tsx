import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CloseSVG from '../assets/CloseSVG';
import { useForm } from '../context';
import { RootState } from '../store';
import CreateProjectButton from './CreateProjectButton/CreateProjectButton';
import { FormTodoAndProjectWrapper } from './FormTodoAndProject/FormTodoAndProjectStyled';
import { GreenButtonsWrapper } from './GreenButtons/GreenButtons';
import NameProjectInput from './NameProjectInput/NameProjectInput';
import { PopupSVGWrapper } from './PopupSvg/PopupSVGWrapper';
import { PopupBackgroundWrapper } from './PopupWrapper/PopupBackgroundStyled';
import { PopupWrapper } from './PopupWrapper/PopupWrapperStyled';
import SelectTodo from './SelectTodo/SelectTodo';
import TextareaTodo from './TextareaTodo/TextareaTodo';
import TitleTodoInput from './TitleTodoInput/TitleTodoInput';
import TodoButtons from './TodoButtons';

interface ITodoPayload {
  status: string;
  title: string;
  description: string;
  importance: string;
  id: string;
}

interface IPopup {
  titleInputChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textareaChangeHandler?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  selectChangeHandler?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setCreateTodo?: React.Dispatch<React.SetStateAction<boolean>>;
  createTodo?: boolean;
  updateButtonHandler?: (event: React.MouseEvent) => void;
  deleteButtonHandler?: (event: React.MouseEvent) => void;
  submitButtonHandler?: (event: React.MouseEvent) => void;
  selectValue?: string;
  selectedTodo?: ITodoPayload | null;
}

const Popup: React.FC<IPopup> = ({
  titleInputChangeHandler,
  textareaChangeHandler,
  selectChangeHandler,
  deleteButtonHandler,
  updateButtonHandler,
  createTodo,
  setCreateTodo,
  submitButtonHandler,
  selectValue,
  selectedTodo
}) => {
  const {
    setIsVisible,
    isVisible,
    setTodoId,
    idActiveProject,
    setIdActiveProject,
    nameProjectInputHandler,
    nameProject
  } = useForm();
  const [isCreateProject, setIsCreateProject] = useState<boolean>(false);
  const projects = useSelector((state: RootState) => state.projectSlice.projects);
  const [projectsCreate, setProjectsCreate] = useState(projects);
  const [isPlusButtonClicked, setIsPlusButtonClicked] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<string>('');

  const closeButtonHandlerByIsVisible = () => {
    setIsVisible(false);
    setTodoId('');
  };

  const closeButtonHandlerByCreateTodo = () => {
    if (setCreateTodo) {
      setCreateTodo(false);
    }
  };

  const onChangeProjectSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(event.target.value);
    setIdActiveProject(event.target.value);
  };

  const addProjectHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    const newProject = {
      id: `${Math.random()}`,
      name: nameProject
    };
    setProjectsCreate([...projectsCreate, newProject]);
    setIsCreateProject(false);
    setSelectedProject(newProject.id);
    setIsPlusButtonClicked(true);
  };

  return (
    <PopupBackgroundWrapper>
      <PopupWrapper>
        <PopupSVGWrapper className="flex items-center justify-end w-full">
          <CloseSVG
            createTodo={createTodo!}
            closeButtonHandlerByCreateTodo={closeButtonHandlerByCreateTodo}
            closeButtonHandlerByIsVisible={closeButtonHandlerByIsVisible}
            isVisible={isVisible}
          />
        </PopupSVGWrapper>
        <FormTodoAndProjectWrapper>
          <TitleTodoInput
            selectedTodo={selectedTodo!}
            titleInputChangeHandler={titleInputChangeHandler!}
          />
          <TextareaTodo
            selectedTodo={selectedTodo!}
            textareaChangeHandler={textareaChangeHandler!}
          />
          <SelectTodo selectValue={selectValue!} selectChangeHandler={selectChangeHandler!} />
          {(selectedProject || idActiveProject) && (
            <TodoButtons
              isVisible={isVisible}
              createTodo={createTodo!}
              deleteButtonHandler={deleteButtonHandler}
              updateButtonHandler={updateButtonHandler}
              submitButtonHandler={submitButtonHandler}
            />
          )}
          {!idActiveProject && (
            <>
              <label htmlFor="projectSelect">Project:</label>
              <select className="border-2 mb-2" id="projectSelect" onChange={onChangeProjectSelect}>
                <option value="none">None</option>
                {projectsCreate.map((project, index) => {
                  if (nameProject === project.name) {
                    return (
                      <option key={index} value={project.id} selected>
                        {project.name}
                      </option>
                    );
                  }
                  return (
                    <option key={index} value={project.id}>
                      {project.name}
                    </option>
                  );
                })}
              </select>
            </>
          )}
          {!idActiveProject && !isPlusButtonClicked && (
            <>
              <CreateProjectButton setIsCreateProject={setIsCreateProject}>+</CreateProjectButton>
            </>
          )}
          {isCreateProject && (
            <div className="w-full flex flex-col items-start justify-start">
              <NameProjectInput nameProjectInputHandler={nameProjectInputHandler} />
              <GreenButtonsWrapper onClick={addProjectHandler}>Add</GreenButtonsWrapper>
            </div>
          )}
        </FormTodoAndProjectWrapper>
      </PopupWrapper>
    </PopupBackgroundWrapper>
  );
};

export default Popup;
