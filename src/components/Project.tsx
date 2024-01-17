import React from 'react';
import { useNavigate } from 'react-router-dom';
import SettingSVG from '../assets/SettingSVG';
import ButtonSettings from './ButtonSettings/ButtonSettings';
import ProjectBlock from './ProjectBlock/ProjectBlock';
import ProjectName from './ProjectNames/ProjectName';

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
  const history = useNavigate();

  const settingButtonHandler = () => {
    setIsSetting(true);
  };
  const setIdActiveProjectHandler = () => {
    setIdActiveProject(`${item.id}`);
    history(`/project/${item.id}`);
  };

  return (
    <div onClick={setIdActiveProjectHandler}>
      <ProjectBlock projectId={item.id}>
        <ProjectName>{item.name}</ProjectName>
        <ButtonSettings settingButtonHandler={settingButtonHandler}>
          <SettingSVG />
        </ButtonSettings>
      </ProjectBlock>
    </div>
  );
};

export default Project;
