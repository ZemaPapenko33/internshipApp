import { ProjectBlockWrapper } from './ProjectBlockStyled';

interface IProjectBlock {
  children: React.ReactNode;
}

const ProjectBlock: React.FC<IProjectBlock> = ({ children }) => {
  return <ProjectBlockWrapper>{children}</ProjectBlockWrapper>;
};

export default ProjectBlock;
