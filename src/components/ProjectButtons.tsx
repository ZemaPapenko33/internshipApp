import DeleteButton from './DeleteButton/DeleteButton';
import { GreenButtonsWrapper } from './GreenButtons/GreenButtons';
import { RedButtonsWrapper } from './RedButtons/RedButtonsStyled';

interface IProjectButtons {
  isCreateProject: boolean;
  isSetting: boolean;
  closeButtonHandlerByCreate: () => void;
  closeButtonHandlerBySetting: () => void;
  addButtonHandler: (event: React.MouseEvent) => void;
  deleteButtonHandler: (event: React.MouseEvent) => void;
  renameButtonHandler: (event: React.MouseEvent) => void;
}

const ProjectButtons: React.FC<IProjectButtons> = ({
  isCreateProject,
  closeButtonHandlerByCreate,
  addButtonHandler,
  isSetting,
  closeButtonHandlerBySetting,
  deleteButtonHandler,
  renameButtonHandler
}) => {
  return (
    <>
      {isCreateProject && (
        <div>
          <RedButtonsWrapper create="create" onClick={closeButtonHandlerByCreate}>
            Close
          </RedButtonsWrapper>
          <GreenButtonsWrapper onClick={addButtonHandler}>Add</GreenButtonsWrapper>
        </div>
      )}
      {isSetting && (
        <div>
          <RedButtonsWrapper onClick={closeButtonHandlerBySetting}>Close</RedButtonsWrapper>
          <DeleteButton deleteButtonHandler={deleteButtonHandler}> Delete</DeleteButton>
          <GreenButtonsWrapper onClick={renameButtonHandler}>Rename</GreenButtonsWrapper>
        </div>
      )}
    </>
  );
};

export default ProjectButtons;
