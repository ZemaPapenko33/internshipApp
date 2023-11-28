import { SidebarTitleWrapper } from './SidebarTitleStyled';

interface ISidebarTitle {
  children: React.ReactNode;
}

export const SidebarTitle: React.FC<ISidebarTitle> = ({ children }) => {
  return <SidebarTitleWrapper>{children}</SidebarTitleWrapper>;
};
