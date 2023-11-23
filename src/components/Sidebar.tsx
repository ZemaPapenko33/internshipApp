import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../context';
import { RootState } from '../store';

const Sidebar = () => {
  const { setIsCreateProject, setIdActiveProject, setIsSetting } = useForm();
  const projects = useSelector((state: RootState) => state.projectSlice.projects);

  return (
    <div className="h-screen w-[15%] mr-10 shadow">
      <h1 className="shadow py-2 w-full text-center">Your Projects:</h1>
      {projects.map((item, index: number) => {
        return (
          <div
            onClick={() => {
              setIdActiveProject(`${item.id}`);
            }}
            key={index}
          >
            <div className="text-center mb-2 bg-slate-100 select-none flex items-center justify-center">
              <p className="text-lg w-[50%]">{item.name}</p>
              <button
                className="w-[10%] flex items-center justify-center"
                onClick={() => setIsSetting(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  width="800px"
                  height="800px"
                  viewBox="0 0 32 32"
                  enable-background="new 0 0 32 32"
                  id="Glyph"
                  version="1.1"
                  className="w-[20px] h-[20px]"
                >
                  <path
                    d="M16,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S17.654,13,16,13z"
                    id="XMLID_287_"
                  />
                  <path
                    d="M6,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S7.654,13,6,13z"
                    id="XMLID_289_"
                  />
                  <path
                    d="M26,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S27.654,13,26,13z"
                    id="XMLID_291_"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
      <div className="w-full h-[3px] bg-slate-300 mb-1"></div>
      <button
        className="bg-blue-500 w-full text-center text-2xl text-white hover:bg-white hover:text-black hover:border-2 hover:border-blue-500"
        onClick={() => {
          setIsCreateProject(true);
        }}
      >
        +
      </button>
    </div>
  );
};

export default Sidebar;
