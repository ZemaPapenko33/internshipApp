import React, { useEffect, useRef, useState } from 'react';
import { AiPageWrapper } from '../components/AiPageWrapper/AiPageStyled';
import { AiSidebarWrapper } from '../components/AiSidebar/AiSidebar';
import TextareaMessageGPT from '../components/InputMessageChatGPT/TextareaMessageGPT';
import OpenAI from 'openai';
import { ArrowUpIcon } from '../components/arrowUpIcon/arrowUpIconStyled';
import { faArrowUp, faStop } from '@fortawesome/free-solid-svg-icons';
import { ChatCompletionMessageParam } from 'openai/resources';

const AiPage = () => {
  const [questionChatGPT, setQuestionChatGPT] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([]);
  const [isWaitResponse, setIsWaitResponse] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_APIKEY_OPENAI,
    dangerouslyAllowBrowser: true
  });

  const onChangeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionChatGPT(event.target.value);
  };

  async function clickTest() {
    if (isWaitResponse) return;

    setIsWaitResponse(true);
    setChatHistory((prevState) => [...prevState, { role: 'user', content: questionChatGPT }]);

    const myMessages = chatHistory.map((message) => ({
      role: message.role,
      content: message.content
    })) as ChatCompletionMessageParam[];

    myMessages.push({
      role: 'user',
      content: questionChatGPT
    });
    setQuestionChatGPT('');

    const completion = await openai.chat.completions.create({
      messages: [...myMessages],
      model: 'gpt-3.5-turbo'
    });

    if (completion.choices[0].message.content !== null) {
      setChatHistory((prevState) => [
        ...prevState,
        { role: 'assistant', content: completion.choices[0].message.content! }
      ]);
    }
    setIsWaitResponse(false);
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      clickTest();
    }
  };

  useEffect(scrollToBottom, [chatHistory]);

  return (
    <AiPageWrapper>
      <AiSidebarWrapper></AiSidebarWrapper>
      <div className="h-full w-[80%]">
        <div className="w-full h-[85%] py-2 px-4 overflow-hidden overflow-y-auto flex flex-col">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={
                message.role === 'user'
                  ? ' self-end bg-blue-300 rounded py-2 px-2 max-w-[45%] '
                  : ' self-start bg-gray-300 rounded py-2 px-2 max-w-[45%]'
              }
              ref={messagesEndRef}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="w-full h-[15%] flex items-center justify-center relative">
          <TextareaMessageGPT
            onChangeMessage={onChangeMessage}
            handleKeyPress={handleKeyPress}
            questionChatGPT={questionChatGPT}
          />
          <button
            className="bg-blue-500 absolute right-[190px] top-100 rounded w-[30px] h-[30px]"
            onClick={clickTest}
          >
            <ArrowUpIcon icon={isWaitResponse ? faStop : faArrowUp} />
          </button>
        </div>
      </div>
    </AiPageWrapper>
  );
};

export default AiPage;
