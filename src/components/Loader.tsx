import React from 'react';
import Load from '../assets/Load.svg';
function Loader() {
  return (
    <div
      role="status"
      className="w-screen h-screen absolute bg-white flex items-center justify-center"
    >
      <img src={Load} alt="Load svg" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Loader;
