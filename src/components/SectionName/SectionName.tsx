import { SectionNameWrapper } from './SectionNameStyled';

interface ISectionName {
  children: React.ReactNode;
}

const SectionName: React.FC<ISectionName> = ({ children }) => {
  return <SectionNameWrapper>{children}</SectionNameWrapper>;
};

export default SectionName;
