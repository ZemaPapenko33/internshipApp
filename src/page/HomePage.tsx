import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteProjectByHomeWrapper } from '../components/DeleteProjectByHome/DeleteProjectByHomeStyled';
import Header from '../components/Header/Header';
import Loader from '../components/LoaderConfig/Loader';
import PopupCreateProject from '../components/PopupCreateProject';
import { useForm } from '../context';
import { db } from '../firebase/firebaseConfig';
import useHomePage from '../hooks/use-home-page.hook';
import { RootState } from '../store';

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

  return (
    <div className="overscroll-x-none overflow-x-hidden bg-slate-100">
      <Header value="Home" />
      <div className="flex py-2  flex-col items-center  overflow-hidden w-screen h-screen relative ">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className="mb-2 text-2xl">Your Projects:</h1>
            <div className="flex w-full justify-center flex-wrap ">
              {projects.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" w-[15%] bg-white h-35 shadow-lg mb-2 mr-4 rounded-xl items-center justify-center flex flex-col select-none  hover:shadow-xl transform hover:scale-105 transition-transform"
                    onClick={() => {
                      setIdActiveProject(item.id);
                      navigate(`/project/${item.id}`);
                    }}
                  >
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
                  </div>
                );
              })}
              <div
                className=" w-[15%] bg-white h-20 shadow-lg mb-2 mr-4 rounded-xl items-center justify-center flex flex-col select-none hover:cursor-pointer hover:shadow-xl transform hover:scale-105 transition-transform "
                onClick={() => {
                  setIsCreateProject(true);
                }}
              >
                <h1 className="text-2xl">+</h1>
              </div>
              {isCreateProject && <PopupCreateProject getProjectData={getProjectData} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
