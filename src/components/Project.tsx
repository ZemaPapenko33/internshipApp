import React from 'react';
import SettingSVG from '../assets/SettingSVG';

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
          <SettingSVG />
        </button>
      </div>
    </div>
  );
};

export default Project;
