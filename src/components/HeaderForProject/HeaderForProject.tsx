import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../context';
import { auth } from '../../firebase/firebaseConfig';
import useProjectPage from '../../hooks/use-project-page.hook';
import AssistantButton from '../AssistantButton/AssistantButton';
import CreateButton from '../CreateButton/CreateButton';
import { HeaderLeftWrapper, HomeIcon } from '../HeaderLeft/HeaderLeftWrapper';
import { HeaderRightWrapper } from '../HeaderRight/HeaderRightWrapper';
import LogoutButton from '../LogoutButton/LogoutButton';
import SearchTodoInput from '../SearchTodoInput/SearchTodoInput';

export const HeaderForProject = () => {
  const { setCreateTodo } = useProjectPage();
  const { setIdActiveProject, setSearchTodo, idActiveProject } = useForm();
  const navigateToLoginPage = useNavigate();
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

  const HomeIconClick = () => {
    navigateToLoginPage('/');
  };

  const assistantHandler = () => {
    navigateToLoginPage(`/project/${idActiveProject}/assistant`);
  };

  return (
    <>
      <HeaderLeftWrapper>
        <HomeIcon icon={faHouse} onClick={HomeIconClick} />
        <SearchTodoInput searchInputChangeHandler={searchInputChangeHandler} />
      </HeaderLeftWrapper>
      <HeaderRightWrapper>
        {idActiveProject ? <AssistantButton assistantHandler={assistantHandler} /> : null}
        <CreateButton createButtonHandler={createButtonHandler} />
        <LogoutButton logOutHandler={logOutHandler} />
      </HeaderRightWrapper>
    </>
  );
};

export default HeaderForProject;
