import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import React from 'react';
import CloseSVG from '../assets/CloseSVG';
import { useForm } from '../context';
import { db } from '../firebase/firebaseConfig';
import { FormTodoAndProjectWrapper } from './FormTodoAndProject/FormTodoAndProjectStyled';
import NameProjectInput from './NameProjectInput/NameProjectInput';
import { PopupSVGWrapper } from './PopupSvg/PopupSVGWrapper';
import { PopupBackgroundWrapper } from './PopupWrapper/PopupBackgroundStyled';
import { PopupWrapper } from './PopupWrapper/PopupWrapperStyled';
import ProjectButtons from './ProjectButtons';

interface IPopupCreateProject {
  getProjectData?: () => Promise<void>;
}

const PopupCreateProject: React.FC<IPopupCreateProject> = ({ getProjectData }) => {
  const {
    setIsCreateProject,
    nameProjectInputHandler,
    nameProject,
    isSetting,
    setIsSetting,
    isCreateProject,
    idActiveProject,
    setIdActiveProject
  } = useForm();
  const email = localStorage.getItem('email');

  const addButtonHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (nameProject) {
      await addDoc(collection(db, 'projects'), {
        name: nameProject,
        email: `${email?.toLocaleLowerCase()}`
      });
      setIsCreateProject(false);
      getProjectData!();
    } else {
      alert('Пожалуйста заполните поле');
    }
  };

  const deleteDocumentById = async (id: string) => {
    await deleteDoc(doc(db, 'todo', id));
    setIdActiveProject('');
  };

  const deleteButtonHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    const todoRef = collection(db, 'todo');
    const q = query(todoRef, where('ProjectId', '==', `${idActiveProject}`));
    const Snapshot = await getDocs(q);
    Snapshot.forEach((docs) => {
      deleteDocumentById(docs.id);
    });
    await deleteDoc(doc(db, 'projects', idActiveProject));
    setIsSetting(false);
    setIdActiveProject('');
    getProjectData!();
  };

  const renameButtonHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    const projectRef = doc(db, 'projects', idActiveProject);
    await updateDoc(projectRef, {
      name: nameProject
    });
    getProjectData!();
    setIsSetting(false);
  };

  const closeButtonHandlerByCreate = () => {
    setIsCreateProject(false);
  };

  const closeButtonHandlerBySetting = () => {
    setIsSetting(false);
  };

  return (
    <PopupBackgroundWrapper>
      <PopupWrapper>
        <PopupSVGWrapper>
          <CloseSVG
            closeButtonHandlerByCreate={closeButtonHandlerByCreate}
            closeButtonHandlerBySetting={closeButtonHandlerBySetting}
            isCreateProject={isCreateProject}
          />
        </PopupSVGWrapper>
        <FormTodoAndProjectWrapper>
          <NameProjectInput nameProjectInputHandler={nameProjectInputHandler} />
          <ProjectButtons
            isSetting={isSetting}
            deleteButtonHandler={deleteButtonHandler}
            renameButtonHandler={renameButtonHandler}
            addButtonHandler={addButtonHandler}
            isCreateProject={isCreateProject}
          />
        </FormTodoAndProjectWrapper>
      </PopupWrapper>
    </PopupBackgroundWrapper>
  );
};

export default PopupCreateProject;
