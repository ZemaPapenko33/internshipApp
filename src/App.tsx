import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AiPage from './page/AiPage';
import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import SelectProjectPage from './page/SelectProjectPage';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/login'} element={<LoginPage />} />
      <Route path={'/register'} element={<RegisterPage />} />
      <Route path={'/project/:projectId'} element={<SelectProjectPage />} />
      <Route path={'/Ai'} element={<AiPage />} />
    </Routes>
  );
}

export default App;
