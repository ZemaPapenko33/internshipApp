import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../context';
import { db } from '../firebase/firebaseConfig';
import useProjectPage from './use-project-page.hook';

interface IProjectPayload {
  name: string;
  id: string;
  count: number;
}

interface IHomePageHook {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  projectClick: (item: IProjectPayload) => void;
  trashOnClick: (id: string) => void;
  addProjectClick: () => void;
}

function useHomePage(): IHomePageHook {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { getProjectData } = useProjectPage();
  const { setIdActiveProject, setIsCreateProject } = useForm();

  const trashOnClick = async (id: string) => {
    setIsLoading(true);
    await deleteDoc(doc(db, 'projects', id));
    getProjectData();
    setIsLoading(false);
  };

  const projectClick = (item: IProjectPayload) => {
    setIdActiveProject(item.id);
    navigate(`/project/${item.id}`);
    localStorage.setItem('projectActiveId', item.id);
  };

  const addProjectClick = () => {
    setIsCreateProject(true);
  };
  return {
    isLoading,
    setIsLoading,
    projectClick,
    trashOnClick,
    addProjectClick
  };
}

export default useHomePage;
