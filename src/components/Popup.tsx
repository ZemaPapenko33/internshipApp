import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CloseSVG from '../assets/CloseSVG';
import { useForm } from '../context';
import { RootState } from '../store';
import CreateProjectButton from './CreateProjectButton/CreateProjectButton';
// import { DeleteIcon } from './deleteLabels/DeleteLabels';
import { FormTodoAndProjectWrapper } from './FormTodoAndProject/FormTodoAndProjectStyled';
import { GreenButtonsWrapper } from './GreenButtons/GreenButtons';
import NameProjectInput from './NameProjectInput/NameProjectInput';
import { PopupSVGWrapper } from './PopupSvg/PopupSVGWrapper';
import { PopupBackgroundWrapper } from './PopupWrapper/PopupBackgroundStyled';
import { PopupWrapper } from './PopupWrapper/PopupWrapperStyled';
import SelectTodo from './SelectTodo/SelectTodo';
import TextAreaLabels from './TextareaForLabels/TextAreaLabels';
import TextareaTodo from './TextareaTodo/TextareaTodo';
import TitleTodoInput from './TitleTodoInput/TitleTodoInput';
import TodoButtons from './TodoButtons';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
    nameProject,
    setSearchLabel,
    searchLabel
  } = useForm();
  const [isCreateProject, setIsCreateProject] = useState<boolean>(false);
  const projects = useSelector((state: RootState) => state.projectSlice.projects);
  const labels = useSelector((state: RootState) => state.labelsSlice.labels);
  const [projectsCreate, setProjectsCreate] = useState(projects);
  const [isPlusButtonClicked, setIsPlusButtonClicked] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [isLabelsClick, setIsLabelsClick] = useState<boolean>(false);
  const labelsFiltered = searchLabel.length
    ? labels.filter((label) => label.labelName.toLowerCase().includes(searchLabel.toLowerCase()))
    : labels;

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
      name: nameProject,
      count: 0
    };
    setProjectsCreate([...projectsCreate, newProject]);
    setIsCreateProject(false);
    setSelectedProject(newProject.id);
    setIsPlusButtonClicked(true);
  };

  const onClickInLabels = () => {
    setIsLabelsClick(true);
    setSearchLabel('');
  };

  const onChangeLabels = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchLabel(event.target.value);
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
          <TextAreaLabels onClickInLabels={onClickInLabels} onChangeLabels={onChangeLabels} />
          {isLabelsClick && (
            <div className="w-[255px] h-[150px] mb-2 flex flex-wrap  px-4 py-2   overflow-y-auto ">
              {labelsFiltered.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-content px-2 text-center h-[25px] bg-slate-300 mr-2 mb-2 rounded hover:bg-slate-400 "
                  >
                    {item.labelName}
                  </div>
                );
              })}
            </div>
          )}
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
