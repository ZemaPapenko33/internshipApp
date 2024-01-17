import React, { RefObject } from 'react';
import TypingLoader from '../TypingLoader/TypingLoader';
import { AiChatBlockWrapper } from './AiChatBlockStyled';

interface IMessage {
  role: string;
  content: string;
}

interface IAiChat {
  chatHistory: IMessage[];
  isWaitResponse: boolean;
  messagesEndRef: RefObject<HTMLDivElement>;
}

const AiChatBlock: React.FC<IAiChat> = ({ chatHistory, isWaitResponse, messagesEndRef }) => {
  return (
    <AiChatBlockWrapper>
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={
            message.role === 'user'
              ? ' self-end bg-blue-300 rounded py-2 px-2 max-w-[45%] mb-2 '
              : ' self-start bg-gray-300 rounded py-2 px-2 max-w-[45%]'
          }
          ref={messagesEndRef}
        >
          {message.content}
        </div>
      ))}
      {isWaitResponse ? <TypingLoader /> : null}
    </AiChatBlockWrapper>
  );
};

export default AiChatBlock;
