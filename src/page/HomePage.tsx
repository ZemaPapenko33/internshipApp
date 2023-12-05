import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../context';

import useHomePage from '../hooks/use-home-page.hook';
import { RootState } from '../store';

function HomePage(): JSX.Element {
  const navigateToLoginPage = useNavigate();
  const user = localStorage.getItem('user');
  const { getProjectData } = useHomePage();
  const { setIdActiveProject } = useForm();
  const projects = useSelector((state: RootState) => state.projectSlice.projects);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigateToLoginPage('/login');
    }
  }, [user]);

  useEffect(() => {
    getProjectData();
  }, []);

  return (
    <div className="overscroll-x-none overflow-x-hidden">
      <div className="flex py-2  flex-col items-center  overflow-hidden w-screen h-screen relative ">
        <h1>Your Projects:</h1>
        {projects.map((item, index) => {
          return (
            <div
              key={index}
              className="w-[20%] h-15 bg-slate-200 mb-2 rounded items-center justify-center flex flex-col hover:bg-slate-400"
              onClick={() => {
                setIdActiveProject(item.id);
                navigate(`/project/${item.id}`);
              }}
            >
              <div>Name project: {item.name}</div>
              <div>Tasks count: {item.count}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
