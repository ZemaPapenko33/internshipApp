import { signOut } from 'firebase/auth';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../context';
import { auth } from '../../firebase/firebaseConfig';
import useProjectPage from '../../hooks/use-project-page.hook';
import { RootState } from '../../store';
import AssistantButton from '../AssistantButton/AssistantButton';
import CreateButton from '../CreateButton/CreateButton';
import { HeaderLeftWrapper } from '../HeaderLeft/HeaderLeftWrapper';
import { HeaderRightWrapper } from '../HeaderRight/HeaderRightWrapper';
import HomeButton from '../HomeButton/HomeButton';
import LogoutButton from '../LogoutButton/LogoutButton';
import SearchTodoInput from '../SearchTodoInput/SearchTodoInput';

export const HeaderForProject = () => {
  const { setCreateTodo } = useProjectPage();
  const { setIdActiveProject, setSearchTodo, idActiveProject, setFilterLabels } = useForm();
  const navigateToLoginPage = useNavigate();
  const Labels = useSelector((state: RootState) => state.labelsSlice.labels);

  const logOutHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setIdActiveProject('');
    signOut(auth).then(() => {
      localStorage.clear();
      navigateToLoginPage('/login');
    });
  };

  const createButtonHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (setCreateTodo) {
      setCreateTodo(true);
    }
  };

  const searchInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTodo(event.target.value);
  };

  const HomeClick = () => {
    navigateToLoginPage('/');
  };

  const assistantHandler = () => {
    navigateToLoginPage(`/project/${idActiveProject}/assistant`);
  };

  const selectLabelsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterLabels(event.target.value);
  };

  return (
    <>
      <HeaderLeftWrapper>
        <SearchTodoInput searchInputChangeHandler={searchInputChangeHandler} />
        <select
          name="labelsSelect"
          className="border-b-[2px] h-[30px] min-w-[200px] rounded px-4"
          onChange={selectLabelsChange}
        >
          <option value="">All</option>
          {Labels.map((label, index) => {
            return (
              <option key={index} value={label.idLabel}>
                {label.labelName}
              </option>
            );
          })}
        </select>
      </HeaderLeftWrapper>
      <HeaderRightWrapper>
        {idActiveProject ? <AssistantButton assistantHandler={assistantHandler} /> : null}
        <CreateButton createButtonHandler={createButtonHandler} />
        <HomeButton HomeClick={HomeClick} />
        <LogoutButton logOutHandler={logOutHandler} />
      </HeaderRightWrapper>
    </>
  );
};

export default HeaderForProject;
