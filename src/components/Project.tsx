import React from 'react';

interface IProjectPayload {
  name: string;
  id: string;
}

interface IProject {
  item: IProjectPayload;
  setIdActiveProject: React.Dispatch<React.SetStateAction<string>>;
  setIsSetting: React.Dispatch<React.SetStateAction<boolean>>;
}

const Project: React.FC<IProject> = ({ setIdActiveProject, item, setIsSetting }) => {
  const settingButtonHandler = () => {
    setIsSetting(true);
  };
  const setIdActiveProjectHandler = () => {
    setIdActiveProject(`${item.id}`);
  };

  return (
    <div onClick={setIdActiveProjectHandler}>
      <div className="text-center mb-2 bg-slate-100 select-none flex items-center justify-center">
        <p className="text-lg w-[50%]">{item.name}</p>
        <button className="w-[10%] flex items-center justify-center" onClick={settingButtonHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            width="800px"
            height="800px"
            viewBox="0 0 32 32"
            enable-background="new 0 0 32 32"
            id="Glyph"
            version="1.1"
            className="w-[20px] h-[20px]"
          >
            <path
              d="M16,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S17.654,13,16,13z"
              id="XMLID_287_"
            />
            <path
              d="M6,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S7.654,13,6,13z"
              id="XMLID_289_"
            />
            <path
              d="M26,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S27.654,13,26,13z"
              id="XMLID_291_"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Project;
