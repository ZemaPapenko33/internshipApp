import styled from '@emotion/styled';

export const PlusButtonWrapper = styled.button`
  width: 100%;
  text-align: center;
  font-size: 1.5rem /* 24px */;
  line-height: 2rem /* 32px */;
  background-color: #3b82f6;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  color: rgb(255 255 255);

  &:hover {
    background-color: rgb(255 255 255);
    color: rgb(0 0 0);
    border-width: 2px;
    border-color: rgb(59 130 246);
  }
`;
