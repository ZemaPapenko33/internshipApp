import React from 'react';
import { useForm } from '../../context';
import { v4 as uuid4v } from 'uuid';

interface IProjectPayload {
  name: string;
  id: string;
  count: number;
}

interface ISelectProject {
  onChangeProjectSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  projectsCreate: IProjectPayload[];
}

const SelectProject: React.FC<ISelectProject> = ({ onChangeProjectSelect, projectsCreate }) => {
  const { nameProject } = useForm();
  return (
    <>
      <label htmlFor="projectSelect">Project:</label>
      <select className="border-2 mb-2" id="projectSelect" onChange={onChangeProjectSelect}>
        <option value="none">None</option>
        {projectsCreate.map((project) => {
          if (nameProject === project.name) {
            return (
              <option key={uuid4v()} value={project.id} selected>
                {project.name}
              </option>
            );
          }
          return (
            <option key={uuid4v()} value={project.id}>
              {project.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SelectProject;
