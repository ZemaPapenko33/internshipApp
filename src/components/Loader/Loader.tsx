import React from 'react';
import LoaderSVG from '../../assets/LoaderSVG';
import { LoaderWrapper } from './LoaderWrapperStyled';
export {};

function Loader() {
  return (
    <LoaderWrapper role="status">
      <LoaderSVG />
      <span className="sr-only">Loading...</span>
    </LoaderWrapper>
  );
}

export default Loader;
