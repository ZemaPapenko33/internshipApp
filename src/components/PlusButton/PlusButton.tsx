import { PlusButtonWrapper } from './PlusButtonStyled';

interface IPlusButton {
  children: React.ReactNode;
  createButtonHandler: () => void;
}

export const PlusButton: React.FC<IPlusButton> = ({ children, createButtonHandler }) => {
  return <PlusButtonWrapper onClick={createButtonHandler}>{children}</PlusButtonWrapper>;
};
