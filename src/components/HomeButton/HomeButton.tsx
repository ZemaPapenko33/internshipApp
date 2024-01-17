import React from 'react';
import { HomeButtonWrapper } from './HomeButtonStyled';

interface IHomeButton {
  HomeClick: () => void;
}

const HomeButton: React.FC<IHomeButton> = ({ HomeClick }) => {
  return <HomeButtonWrapper onClick={HomeClick}>Home</HomeButtonWrapper>;
};

export default HomeButton;
