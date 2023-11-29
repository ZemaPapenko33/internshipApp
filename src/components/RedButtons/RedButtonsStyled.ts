import styled from '@emotion/styled';

export const RedButtonsWrapper = styled.button<{ create?: string }>`
  margin-right: 0.5rem;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  background-color: ${(props) => (props.create ? `rgb(239 68 68)` : ` rgb(255 255 255)`)};
  color: ${(props) => (props.create ? `rgb(255 255 255)` : `rgb(0 0 0)`)};
  border-radius: 0.25rem;
  border-width: 2px;
  width: 100px;
  border-color: ${(props) => (props.create ? `none` : `rgb(239 68 68)`)};
`;
