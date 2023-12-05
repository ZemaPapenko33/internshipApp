import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../context';
import { auth } from '../../firebase/firebaseConfig';
import useHomePage from '../../hooks/use-home-page.hook';
import CreateButton from '../CreateButton/CreateButton';
import { HeaderLeftWrapper, HomeIcon } from '../HeaderLeft/HeaderLeftWrapper';
import { HeaderRightWrapper } from '../HeaderRight/HeaderRightWrapper';
import LogoutButton from '../LogoutButton/LogoutButton';
import SearchTodoInput from '../SearchTodoInput/SearchTodoInput';
import { HeaderWrapper } from './HeaderStyled';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

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

  const HomeIconClick = () => {
    navigateToLoginPage('/');
  };

  return (
    <HeaderWrapper>
      <HeaderLeftWrapper>
        <HomeIcon icon={faHouse} onClick={HomeIconClick} />
        <SearchTodoInput searchInputChangeHandler={searchInputChangeHandler} />
      </HeaderLeftWrapper>
      <HeaderRightWrapper>
        <CreateButton createButtonHandler={createButtonHandler} />
        <LogoutButton logOutHandler={logOutHandler} />
      </HeaderRightWrapper>
    </HeaderWrapper>
  );
}

export default Header;
