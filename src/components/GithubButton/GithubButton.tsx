import { GithubButtonWrapper } from './GithubButtonStyled';

interface IGithubButton {
  children: React.ReactNode;
  githubButtonHandler: (event: React.MouseEvent) => void;
}

const GithubButton: React.FC<IGithubButton> = ({ children, githubButtonHandler }) => {
  return <GithubButtonWrapper onClick={githubButtonHandler}>{children}</GithubButtonWrapper>;
};

export default GithubButton;
