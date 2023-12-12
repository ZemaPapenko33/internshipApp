import React from 'react';
import HeaderForHomePage from '../HeaderForHomePage/HeaderForHomePage';
import HeaderForProject from '../HeaderForProject/HeaderForProject';
import SwitchHeader from '../SwitchHeader/SwitchHeader';
import { HeaderWrapper } from './HeaderStyled';

interface IHeader {
  value: string;
}

function Header({ value }: IHeader) {
  return (
    <HeaderWrapper>
      <SwitchHeader value={value}>
        <HeaderForHomePage data-value="Home" />
        <HeaderForProject data-value="Project" />
      </SwitchHeader>
    </HeaderWrapper>
  );
}

export default Header;
