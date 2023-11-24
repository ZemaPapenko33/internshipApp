import React from 'react';
import { LogoutButtonWrapper } from './LogoutButtonStyled';

interface ILogoutButton {
  logOutHandler: (event: React.MouseEvent) => void;
}

const LogoutButton: React.FC<ILogoutButton> = ({ logOutHandler }) => {
  return <LogoutButtonWrapper onClick={logOutHandler}>Log out </LogoutButtonWrapper>;
};

export default LogoutButton;
