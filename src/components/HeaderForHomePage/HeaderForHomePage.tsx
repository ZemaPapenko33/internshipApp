import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../context';
import { auth } from '../../firebase/firebaseConfig';
import { LogOutIcon } from '../LogOutIcon/LogOutIcon';
import { HeaderFromHomePageWrapper } from './HeaderFromHomePageStyled';

export const HeaderForHomePage = () => {
  const userName = localStorage.getItem('name');
  const { setIdActiveProject } = useForm();
  const navigateToLoginPage = useNavigate();

  const logOutHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setIdActiveProject('');
    signOut(auth).then(() => {
      localStorage.clear();
      navigateToLoginPage('/login');
    });
  };

  return (
    <HeaderFromHomePageWrapper>
      {`Hello, ${userName}`} <LogOutIcon icon={faRightFromBracket} onClick={logOutHandler} />
    </HeaderFromHomePageWrapper>
  );
};

export default HeaderForHomePage;
