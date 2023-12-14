import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteProjectByHomeWrapper } from '../components/DeleteProjectByHome/DeleteProjectByHomeStyled';
import Header from '../components/Header/Header';
import { HomePageWrapper } from '../components/HomePageWrapper/HomePageStyled';
import { HomeProjectWrapper } from '../components/HomeProjectWrapper/HomeProjectStyled';
import Loader from '../components/LoaderConfig/Loader';
import PopupCreateProject from '../components/PopupCreateProject';
import { ProjectBlockHomeWrapper } from '../components/ProjectBlockInHomePage/ProjectBlockHomeStyled';
import { useForm } from '../context';
import { db } from '../firebase/firebaseConfig';
import useHomePage from '../hooks/use-home-page.hook';
import { RootState } from '../store';

interface IProjectPayload {
  name: string;
  id: string;
  count: number;
}

function HomePage(): JSX.Element {
  const navigateToLoginPage = useNavigate();
  const user = localStorage.getItem('user');
  const { getProjectData } = useHomePage();
  const { setIdActiveProject, setIsCreateProject, isCreateProject } = useForm();
  const projects = useSelector((state: RootState) => state.projectSlice.projects);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigateToLoginPage('/login');
    }
  }, [user]);

  useEffect(() => {
    getProjectData();
    setIsLoading(false);
  }, []);

  const trashOnClick = async (id: string) => {
    setIsLoading(true);
    await deleteDoc(doc(db, 'projects', id));
    getProjectData();
    setIsLoading(false);
  };

  const projectClick = (item: IProjectPayload) => {
    setIdActiveProject(item.id);
    navigate(`/project/${item.id}`);
  };

  const addProjectClick = () => {
    setIsCreateProject(true);
  };

  return (
    <div className="overscroll-x-none overflow-x-hidden bg-slate-100">
      <Header value="Home" />
      <HomePageWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className="mb-2 text-2xl">Your Projects:</h1>
            <HomeProjectWrapper>
              {projects.map((item, index) => {
                return (
                  <ProjectBlockHomeWrapper key={index} onClick={() => projectClick(item)}>
                    <div className="w-full flex justify-end px-2 py-2">
                      <DeleteProjectByHomeWrapper
                        icon={faTrash}
                        onClick={(event) => {
                          event.stopPropagation();
                          trashOnClick(item.id);
                        }}
                      />
                    </div>
                    <h1>Name project: {item.name}</h1>
                    <p>Tasks count: {item.count}</p>
                  </ProjectBlockHomeWrapper>
                );
              })}
              <ProjectBlockHomeWrapper onClick={addProjectClick}>
                <h1 className="text-2xl">+</h1>
              </ProjectBlockHomeWrapper>
              {isCreateProject && <PopupCreateProject getProjectData={getProjectData} />}
            </HomeProjectWrapper>
          </>
        )}
      </HomePageWrapper>
    </div>
  );
}

export default HomePage;
