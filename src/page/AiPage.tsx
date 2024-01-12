import React, { useEffect, useRef, useState } from 'react';
import { AiPageWrapper } from '../components/AiPageWrapper/AiPageStyled';
import { AiSidebarWrapper } from '../components/AiSidebar/AiSidebar';
import TextareaMessageGPT from '../components/InputMessageChatGPT/TextareaMessageGPT';
import OpenAI from 'openai';
import { ArrowUpIcon } from '../components/arrowUpIcon/arrowUpIconStyled';
import { faArrowUp, faStop, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ChatCompletionMessageParam } from 'openai/resources';
import { AiMainWrapper } from '../components/AiMainWrapper/AiMainWrapperStyled';
import AiChatBlock from '../components/AiChatBlock/AiChatBlock';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../context';
import { BackArrow } from '../components/BackArrowIcon/BackArrowIconStyled';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const AiPage = () => {
  const [questionChatGPT, setQuestionChatGPT] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([]);
  const [isWaitResponse, setIsWaitResponse] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { idActiveProject } = useForm();
  const history = useNavigate();
  const todosProject = useSelector((state: RootState) => state.todoSlice.todos)
    .filter((todo) => todo.idProject === idActiveProject)
    .sort((currentTodo, nextTodo) => currentTodo.title.localeCompare(nextTodo.title));

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

  const backProjectHandler = () => {
    history(`/project/${idActiveProject}`);
  };

  useEffect(scrollToBottom, [chatHistory]);

  return (
    <AiPageWrapper>
      <AiSidebarWrapper>
        <div
          onClick={backProjectHandler}
          className="px-2 py-2 hover:bg-blue-700 rounded mb-4 cursor-pointer "
        >
          <BackArrow icon={faArrowLeft} />
          Back to project
        </div>
        {todosProject.map((todo, index) => {
          return (
            <div key={index} className="px-2 py-2 hover:bg-blue-700 rounded cursor-pointer">
              {todo.title}
            </div>
          );
        })}
      </AiSidebarWrapper>
      <AiMainWrapper>
        {chatHistory.length ? (
          <AiChatBlock
            chatHistory={chatHistory}
            isWaitResponse={isWaitResponse}
            messagesEndRef={messagesEndRef}
          />
        ) : (
          <div className="w-full h-[85%] flex flex-col items-center justify-center">
            How i can help you today?
          </div>
        )}
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
      </AiMainWrapper>
    </AiPageWrapper>
  );
};

export default AiPage;
