import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../context';
import { RootState } from '../store';
import Project from './Project';

const Sidebar = () => {
  const { setIsCreateProject, setIdActiveProject, setIsSetting } = useForm();
  const projects = useSelector((state: RootState) => state.projectSlice.projects);
  const createButtonHandler = () => {
    setIsCreateProject(true);
  };

  return (
    <div className="h-screen w-[15%] mr-10 shadow">
      <h1 className="shadow py-2 w-full text-center">Your Projects:</h1>
      {projects.map((item, index: number) => {
        return (
          <Project
            key={index}
            item={item}
            setIdActiveProject={setIdActiveProject}
            setIsSetting={setIsSetting}
          />
        );
      })}
      <div className="w-full h-[3px] bg-slate-300 mb-1"></div>
      <button
        className="bg-blue-500 w-full text-center text-2xl text-white hover:bg-white hover:text-black hover:border-2 hover:border-blue-500 transform-all"
        onClick={createButtonHandler}
      >
        +
      </button>
    </div>
  );
};

export default Sidebar;
