import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../context';
import { RootState } from '../store';
import LineSidebar from './LineSidebar/LineSidebar';
import { PlusButton } from './PlusButton/PlusButton';
import Project from './Project';
import { SidebarTitle } from './SidebarTitle/SidebarTitle';
import { SidebarWrapper } from './SidebarWrapper/SidebarWrapper';

const Sidebar = () => {
  const { setIsCreateProject, setIdActiveProject, setIsSetting } = useForm();
  const projects = useSelector((state: RootState) => state.projectSlice.projects);
  const createButtonHandler = () => {
    setIsCreateProject(true);
  };

  return (
    <SidebarWrapper>
      <SidebarTitle>Your Projects:</SidebarTitle>
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
      <LineSidebar />
      <PlusButton createButtonHandler={createButtonHandler}>+</PlusButton>
    </SidebarWrapper>
  );
};

export default Sidebar;
