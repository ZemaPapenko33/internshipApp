import { useForm } from '../../context';
import { ProjectBlockWrapper } from './ProjectBlockStyled';

interface IProjectBlock {
  children: React.ReactNode;
  projectId: string;
}

const ProjectBlock: React.FC<IProjectBlock> = ({ children, projectId }) => {
  const { idActiveProject } = useForm();
  return (
    <ProjectBlockWrapper
      className={projectId === idActiveProject ? 'border-l-[5px] border-blue-500' : ''}
    >
      {children}
    </ProjectBlockWrapper>
  );
};

export default ProjectBlock;
