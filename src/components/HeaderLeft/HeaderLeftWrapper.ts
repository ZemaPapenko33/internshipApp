import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const HeaderLeftWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 50%;
`;

export const HomeIcon = styled(FontAwesomeIcon)`
  color: #3b82f6;
  width: 25px;
  height: 25px;
  margin-right: 0.5rem;

  &:hover {
    cursor: pointer;
  }
`;
