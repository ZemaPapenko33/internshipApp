import React from 'react';
import { AiPageWrapper } from '../components/AiPageWrapper/AiPageStyled';
import { AiSidebarWrapper } from '../components/AiSidebar/AiSidebar';

const AiPage = () => {
  return (
    <AiPageWrapper>
      <AiSidebarWrapper></AiSidebarWrapper>
      <div className="h-full w-[80%]">
        <div className="w-full h-[85%]"></div>
        <div className="w-full h-[15%] flex items-center justify-center">
          <input
            type="text"
            placeholder="Message chatGPT..."
            className="w-[70%] h-[50%] px-2 rounded-xl border-2 border-blue-500"
          />
        </div>
      </div>
    </AiPageWrapper>
  );
};

export default AiPage;
