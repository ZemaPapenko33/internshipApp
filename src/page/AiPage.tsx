import React, { useState } from 'react';
import { AiPageWrapper } from '../components/AiPageWrapper/AiPageStyled';
import { AiSidebarWrapper } from '../components/AiSidebar/AiSidebar';
import InputMessageGPT from '../components/InputMessageChatGPT/InputMessageGPT';
import OpenAI from 'openai';

const AiPage = () => {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_APIKEY_OPENAI,
    dangerouslyAllowBrowser: true
  });
  const [answerChatGPT, setAnswerChatGPT] = useState<string>('');
  const [questionChatGPT, setQuestionChatGPT] = useState<string>('');

  const onChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionChatGPT(event.target.value);
  };

  async function clickTest() {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: questionChatGPT
        }
      ],
      model: 'gpt-3.5-turbo'
    });

    setAnswerChatGPT('');
    for (let i = 0; i < completion.choices[0].message.content!.length; i++) {
      setTimeout(() => {
        setAnswerChatGPT((prevState) => prevState + completion.choices[0].message.content![i]);
      }, i * 100); // Имитация задержки для пошагового отображения
    }
  }

  return (
    <AiPageWrapper>
      <AiSidebarWrapper></AiSidebarWrapper>
      <div className="h-full w-[80%]">
        <div className="w-full h-[85%]">
          <div>{answerChatGPT}</div>
        </div>
        <div className="w-full h-[15%] flex items-center justify-center">
          <InputMessageGPT onChangeMessage={onChangeMessage} />
          <button onClick={clickTest}>test</button>
        </div>
      </div>
    </AiPageWrapper>
  );
};

export default AiPage;
