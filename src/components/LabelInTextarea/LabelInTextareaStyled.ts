import styled from '@emotion/styled';

export const LabelInTextareaWrapper = styled.div`
  height: 25px;
  width: max-content;
  padding-left: 0.5rem /* 8px */;
  padding-right: 0.5rem /* 8px */;
  text-align: center;
  background-color: rgb(203 213 225);
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
  border-radius: 0.25rem;
  user-select: none;

  &:hover {
    background-color: rgb(148 163 184);
    cursor: pointer;
  }
`;
