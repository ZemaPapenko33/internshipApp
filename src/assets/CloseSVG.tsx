import React from 'react';

interface ICloseSVG {
  closeButtonHandlerByCreateTodo?: () => void;
  closeButtonHandlerByIsVisible?: () => void;
  createTodo?: boolean;
  closeButtonHandlerByCreate?: () => void;
  closeButtonHandlerBySetting?: () => void;
  isCreateProject?: boolean;
  isVisible?: boolean;
}

const CloseSVG: React.FC<ICloseSVG> = ({
  closeButtonHandlerByCreateTodo,
  closeButtonHandlerByIsVisible,
  closeButtonHandlerByCreate,
  closeButtonHandlerBySetting,
  createTodo,
  isCreateProject,
  isVisible
}) => {
  const closeSvgHandler = () => {
    if (createTodo) {
      closeButtonHandlerByCreateTodo!();
    } else if (isVisible) {
      closeButtonHandlerByIsVisible!();
    } else if (isCreateProject) {
      closeButtonHandlerByCreate!();
    } else {
      closeButtonHandlerBySetting!();
    }
  };

  return (
    <div onClick={closeSvgHandler}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="28px" height="28px">
        <g
          fill="#000"
          stroke="none"
          stroke-miterlimit="10"
          stroke-dasharray=""
          stroke-dashoffset="0"
          font-family="none"
          font-weight="none"
          font-size="none"
          text-anchor="none"
        >
          <g transform="scale(5.33333,5.33333)">
            <path
              transform="translate(24.00059,-9.94113) rotate(45.001)"
              d="M21.5,4.5h5.001v39h-5.001z"
            ></path>
            <path
              transform="translate(57.94113,24.00474) rotate(135.008)"
              d="M21.5,4.5h5v39.001h-5z"
            ></path>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default CloseSVG;
