import styled from '@emotion/styled';

export const ProjectBlockHomeWrapper = styled.div`
  width: 15%;
  background-color: rgb(255 255 255);
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  margin-bottom: 0.5rem /* 8px */;
  margin-right: 1rem /* 16px */;
  border-radius: 0.75rem /* 12px */;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  user-select: none;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    box-shadow:
      0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    transform: scale(1.05);
  }
`;
