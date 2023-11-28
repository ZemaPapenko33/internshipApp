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
import { useForm } from '../context';
import { db } from '../firebase/firebaseConfig';

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
    idActiveProject
  } = useForm();
  const email = localStorage.getItem('email');

  const addButtonHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    await addDoc(collection(db, 'projects'), {
      name: nameProject,
      email: `${email?.toLocaleLowerCase()}`
    });
    setIsCreateProject(false);
    getProjectData!();
  };

  const deleteDocumentById = async (id: string) => {
    await deleteDoc(doc(db, 'todo', id));
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
    <div className="flex items-center w-screen h-screen bg-black absolute justify-center bg-opacity-50">
      <div className="flex flex-col py-2 px-4 items-center justify-center bg-white w-[350px] h-[350px] rounded  ">
        <form className="flex flex-col items-start justify-center py-4 px-4 w-[350px] h-[350px]">
          <input
            type="text"
            placeholder="Name project"
            className="mb-2 shadow-lg rounded border-2 h-[30px] px-2 py-2"
            onChange={nameProjectInputHandler}
          />
          {isCreateProject && (
            <div>
              <button
                className="mr-2 shadow-lg bg-red-500 text-white rounded border-2 w-[100px]"
                onClick={closeButtonHandlerByCreate}
              >
                Close
              </button>
              <button
                className="shadow-lg rounded border-2 w-[100px] bg-green-500 text-white"
                onClick={addButtonHandler}
              >
                Add
              </button>
            </div>
          )}
          {isSetting && (
            <div>
              <button
                className="mr-2 shadow-lg bg-white text-black rounded border-2 border-red-500 w-[100px]"
                onClick={closeButtonHandlerBySetting}
              >
                Close
              </button>
              <button
                className="mr-2 shadow-lg bg-red-500 text-white rounded border-2 w-[100px]"
                onClick={deleteButtonHandler}
              >
                Delete
              </button>
              <button
                className="shadow-lg rounded border-2 w-[100px] bg-green-500 text-white"
                onClick={renameButtonHandler}
              >
                Rename
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PopupCreateProject;
