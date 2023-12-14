import React from 'react';
import { Link } from 'react-router-dom';
import Error404 from '../assets/img/404E.jpg';
import { NotFoundWrapper } from '../components/NotFoundWrapper/NotFoundWrapper';
import { MyRoutes } from '../shared/enum';

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <img src={Error404} alt="Error 404" className="object-cover w-[50%] h-full" />
      <h1 className="text-2xl">
        Page not found
        <Link to={MyRoutes.HOME_ROUTE} className="underline decoration-zinc-500  text-blue-500">
          {' '}
          Go home
        </Link>
      </h1>
    </NotFoundWrapper>
  );
};

export default NotFound;
