import { CreateButtonWrapper } from './CreateButtonStyled';

interface ICreateButton {
  createButtonHandler: (event: React.MouseEvent) => void;
}

const CreateButton: React.FC<ICreateButton> = ({ createButtonHandler }) => {
  return <CreateButtonWrapper onClick={createButtonHandler}>Create</CreateButtonWrapper>;
};

export default CreateButton;
