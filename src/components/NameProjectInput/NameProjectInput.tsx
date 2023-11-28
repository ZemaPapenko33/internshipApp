import { NameProjectInputWrapper } from './NameProjectInputStyled';

interface INameProjectInput {
  nameProjectInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NameProjectInput: React.FC<INameProjectInput> = ({ nameProjectInputHandler }) => {
  return (
    <NameProjectInputWrapper
      type="text"
      placeholder="Name project"
      onChange={nameProjectInputHandler}
    />
  );
};

export default NameProjectInput;
