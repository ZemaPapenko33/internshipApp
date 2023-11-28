import { SubtitleFormWrapper } from './SubtitleFormStyled';

interface ISubtitleForm {
  children: React.ReactNode;
}

const SubtitleForm: React.FC<ISubtitleForm> = ({ children }) => {
  return <SubtitleFormWrapper>{children}</SubtitleFormWrapper>;
};

export default SubtitleForm;
