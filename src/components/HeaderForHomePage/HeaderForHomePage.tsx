import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { LogOutIcon } from '../LogOutIcon/LogOutIcon';
import { HeaderFromHomePageWrapper } from './HeaderFromHomePageStyled';

export const HeaderForHomePage = () => {
  const userName = localStorage.getItem('name');
  return (
    <HeaderFromHomePageWrapper>
      {`Hello, ${userName}`} <LogOutIcon icon={faRightFromBracket} />
    </HeaderFromHomePageWrapper>
  );
};

export default HeaderForHomePage;
