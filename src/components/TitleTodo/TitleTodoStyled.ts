import styled from '@emotion/styled';

export const TitleTodoWrapper = styled.h1<{ color: string }>`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  width: 100%;
  background: ${(props) =>
    props.color === 'green' ? 'green' : props.color === 'yellow' ? 'yellow' : 'red'};
`;
