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
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { idActiveProject, setIdActiveProject } = useForm();
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

  async function chatGPTHandler() {
    const newController = new AbortController();
    setAbortController(newController);

    if (isWaitResponse) {
      newController.abort();
      setIsWaitResponse(false);
      return;
    }

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

    try {
      const completion = await openai.chat.completions.create(
        {
          messages: [...myMessages],
          model: 'gpt-3.5-turbo'
        },
        { signal: newController.signal }
      );

      if (completion.choices[0].message.content !== null) {
        setChatHistory((prevState) => [
          ...prevState,
          { role: 'assistant', content: completion.choices[0].message.content! }
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsWaitResponse(false);
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      chatGPTHandler();
    }
  };

  const clickHandler = () => {
    if (isWaitResponse) {
      abortController!.abort();
      setIsWaitResponse(false);
      return;
    }

    chatGPTHandler();
  };

  const backProjectHandler = () => {
    history(`/project/${idActiveProject}`);
  };

  const todoClickHandler = (todo: {
    status: string;
    title: string;
    description: string;
    importance: string;
    id: string;
    idProject: string;
    Labels: string[];
  }) => {
    setQuestionChatGPT(todo.description);
  };

  useEffect(() => {
    const projectActiveId = localStorage.getItem('projectActiveId')!;
    console.log(projectActiveId, '111');
    console.log(todosProject);
    if (projectActiveId) {
      setIdActiveProject(projectActiveId);
    }
  }, []);
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
            <div
              key={index}
              className="px-2 py-2 hover:bg-blue-700 rounded cursor-pointer"
              onClick={() => todoClickHandler(todo)}
            >
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
            <svg
              style={{
                width: '5rem',
                height: '5rem',
                verticalAlign: 'middle',
                fill: 'currentColor',
                overflow: 'hidden'
              }}
              viewBox="0 0 1024 1024"
              version="1.1"
            >
              <path d="M981.333333 618.666667h-106.666666v-21.333334a298.666667 298.666667 0 0 0-118.186667-244.053333l103.893333-162.986667a64 64 0 1 0-36.053333-23.04l-103.04 162.133334A416.213333 416.213333 0 0 0 512 277.333333a416.213333 416.213333 0 0 0-209.28 52.053334l-103.04-162.133334a64 64 0 1 0-36.053333 23.04l103.893333 162.986667A298.666667 298.666667 0 0 0 149.333333 597.333333v21.333334H42.666667v256h106.666666v85.333333h725.333334v-85.333333h106.666666zM85.333333 832v-170.666667h64v170.666667z m746.666667 85.333333H192V597.333333c0-192 160.64-277.333333 320-277.333333s320 85.333333 320 277.333333v320z m106.666667-85.333333h-64v-170.666667h64z" />
              <path d="M405.333333 661.333333m-42.666666 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z" />
              <path d="M618.666667 661.333333m-42.666667 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z" />
              <path d="M661.333333 533.333333H362.666667a128 128 0 0 0 0 256h298.666666a128 128 0 0 0 0-256z m0 213.333334H362.666667a85.333333 85.333333 0 0 1 0-170.666667h298.666666a85.333333 85.333333 0 0 1 0 170.666667z" />
            </svg>
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
            onClick={clickHandler}
          >
            <ArrowUpIcon icon={isWaitResponse ? faStop : faArrowUp} />
          </button>
        </div>
      </AiMainWrapper>
    </AiPageWrapper>
  );
};

export default AiPage;
