import DeleteButton from './DeleteButton/DeleteButton';
import { GreenButtonsWrapper } from './GreenButtons/GreenButtons';

interface IProjectButtons {
  isCreateProject: boolean;
  isSetting: boolean;

  addButtonHandler: (event: React.MouseEvent) => void;
  deleteButtonHandler: (event: React.MouseEvent) => void;
  renameButtonHandler: (event: React.MouseEvent) => void;
}

const ProjectButtons: React.FC<IProjectButtons> = ({
  isCreateProject,
  addButtonHandler,
  isSetting,
  deleteButtonHandler,
  renameButtonHandler
}) => {
  return (
    <>
      {isCreateProject && (
        <div>
          <GreenButtonsWrapper onClick={addButtonHandler}>Add</GreenButtonsWrapper>
        </div>
      )}
      {isSetting && (
        <div>
          <DeleteButton deleteButtonHandler={deleteButtonHandler}> Delete</DeleteButton>
          <GreenButtonsWrapper onClick={renameButtonHandler}>Rename</GreenButtonsWrapper>
        </div>
      )}
    </>
  );
};

export default ProjectButtons;
