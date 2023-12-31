import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../context';
import { auth } from '../../firebase/firebaseConfig';
import useHomePage from '../../hooks/use-home-page.hook';
import CreateButton from '../CreateButton/CreateButton';
import LogoutButton from '../LogoutButton/LogoutButton';
import SearchTodoInput from '../SearchTodoInput/SearchTodoInput';
import { HeaderWrapper } from './HeaderStyled';

function Header() {
  const { setCreateTodo } = useHomePage();
  const navigateToLoginPage = useNavigate();
  const { setSearchTodo, setIdActiveProject } = useForm();
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

  return (
    <HeaderWrapper>
      <SearchTodoInput searchInputChangeHandler={searchInputChangeHandler} />
      <CreateButton createButtonHandler={createButtonHandler} />
      <LogoutButton logOutHandler={logOutHandler} />
    </HeaderWrapper>
  );
}

export default Header;
