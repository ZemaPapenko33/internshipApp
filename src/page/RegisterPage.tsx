import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import useRegisterPage from '../hooks/use-register-page.hook';

function RegisterPage(): JSX.Element {
  const {
    isInvalidEmail,
    passwordLength,
    isUseEmail,
    formHandler,
    emailInputHandler,
    passwordInputHandler
  } = useRegisterPage();

  return (
    <div className="flex flex-col items-center justify-center  w-screen h-screen py-2 px-4">
      <form className="flex flex-col items-center justify-center" onSubmit={formHandler}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="mb-3 rounded px-2 shadow-lg h-[30px] w-[270px] border-2"
          onChange={emailInputHandler}
        />
        {isInvalidEmail && <p className="text-red-500 text-sm mb-3">Invalid Email</p>}
        {isUseEmail && (
          <p className="text-red-500 text-sm mb-3">
            Email already in use{' '}
            <Link to="/login" className="underline decoration-zinc-500 text-zinc-950">
              go to Login
            </Link>
          </p>
        )}
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="mb-2  rounded px-2 shadow-lg h-[30px] w-[270px] border-2"
          onChange={passwordInputHandler}
        />
        {passwordLength && (
          <p className="text-red-500 text-sm">enter a password longer than 8 characters</p>
        )}
        <p className="italic text-gray-500 mb-2">
          already have an account?{' '}
          <Link to="/login" className="underline decoration-zinc-500 text-zinc-950">
            go to Login
          </Link>
        </p>
        <button className="h-[30px] w-[270px] rounded shadow-lg bg-gray-200 transition-all hover:shadow-xl">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
