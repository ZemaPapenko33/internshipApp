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
    <div>
      {isCreateProject && (
        <div>
          <button
            className="mr-2 shadow-lg bg-red-500 text-white rounded border-2 w-[100px]"
            onClick={closeButtonHandlerByCreate}
          >
            Close
          </button>
          <button
            className="shadow-lg rounded border-2 w-[100px] bg-green-500 text-white"
            onClick={addButtonHandler}
          >
            Add
          </button>
        </div>
      )}
      {isSetting && (
        <div>
          <button
            className="mr-2 shadow-lg bg-white text-black rounded border-2 border-red-500 w-[100px]"
            onClick={closeButtonHandlerBySetting}
          >
            Close
          </button>
          <button
            className="mr-2 shadow-lg bg-red-500 text-white rounded border-2 w-[100px]"
            onClick={deleteButtonHandler}
          >
            Delete
          </button>
          <button
            className="shadow-lg rounded border-2 w-[100px] bg-green-500 text-white"
            onClick={renameButtonHandler}
          >
            Rename
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectButtons;
