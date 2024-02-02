import React from 'react';

const TypingLoader = () => {
  return (
    <div className="flex gap-2">
      <div className="w-2 h-2 rounded-full animate-pulse bg-blue-600"></div>
      <div className="w-2 h-2 rounded-full animate-pulse bg-blue-600"></div>
      <div className="w-2 h-2 rounded-full animate-pulse bg-blue-600"></div>
    </div>
  );
};

export default TypingLoader;
