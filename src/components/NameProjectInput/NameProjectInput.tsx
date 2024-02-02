import { useSelector } from 'react-redux';
import { useForm } from '../../context';
import { RootState } from '../../store';
import { NameProjectInputWrapper } from './NameProjectInputStyled';

interface INameProjectInput {
  nameProjectInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NameProjectInput: React.FC<INameProjectInput> = ({ nameProjectInputHandler }) => {
  const { isSetting, idActiveProject } = useForm();
  const project = useSelector((state: RootState) => state.projectSlice.projects).filter(
    (projects) => projects.id === idActiveProject
  );

  return (
    <NameProjectInputWrapper
      type="text"
      placeholder="Name project"
      onChange={nameProjectInputHandler}
      defaultValue={isSetting ? project[0].name : ''}
    />
  );
};

export default NameProjectInput;
