import styled from '@emotion/styled';

export const GithubButtonWrapper = styled.button`
  border-radius: 0.25rem;
  background-color: rgb(0 0 0);
  color: rgb(255 255 255);
  width: 270px;
  height: 30px;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  &:hover {
    box-shadow:
      0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
  }
`;
