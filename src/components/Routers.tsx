import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AssistantPage from '../page/AssistantPage';
import HomePage from '../page/HomePage';
import LoginPage from '../page/LoginPage';
import NotFound from '../page/NotFound';
import RegisterPage from '../page/RegisterPage';
import SelectProjectPage from '../page/SelectProjectPage';
import { MyRoutes } from '../shared/enum';

const Routers = () => {
  return (
    <Routes>
      <Route path={MyRoutes.HOME_ROUTE} element={<HomePage />} />
      <Route path={MyRoutes.LOGIN_ROUTE} element={<LoginPage />} />
      <Route path={MyRoutes.REGISTER_ROUTE} element={<RegisterPage />} />
      <Route path={MyRoutes.PROJECT_ROUTE} element={<SelectProjectPage />} />
      <Route path={MyRoutes.Ai_ROUTE} element={<AssistantPage />} />
      <Route path={MyRoutes.NOTFOUND_ROUTE} element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
