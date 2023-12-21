import styled from '@emotion/styled';

export const ImportanceCircleWrapper = styled.div<{ color: string }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.color === 'green' ? 'green' : props.color === 'yellow' ? 'yellow' : 'red'};
`;
