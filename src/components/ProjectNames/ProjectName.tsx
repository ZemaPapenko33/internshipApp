import { ProjectNameWrapper } from './ProjectNamesStyled';

interface IProjectName {
  children: React.ReactNode;
}

const ProjectName: React.FC<IProjectName> = ({ children }) => {
  return <ProjectNameWrapper>{children}</ProjectNameWrapper>;
};

export default ProjectName;
