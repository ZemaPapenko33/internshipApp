import React from 'react';
import { Link } from 'react-router-dom';
import useLoginPage from '../hooks/use-login-page.hook';
import { useForm } from '../context';

function LoginPage(): JSX.Element {
  const { email, password, emailInputHandler, passwordInputHandler } = useForm();
  const { formHandler, isLoginCredential, isMissingPassword } = useLoginPage(email, password);

  return (
    <div className="flex flex-col items-center justify-center  w-screen h-screen py-2 px-4">
      <form className="flex flex-col items-center justify-center mb-3" onSubmit={formHandler}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="mb-3 rounded px-2 shadow-lg h-[30px] w-[270px] border-2"
          onChange={emailInputHandler}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="mb-2  rounded px-2 shadow-lg h-[30px] w-[270px] border-2"
          onChange={passwordInputHandler}
        />
        {isMissingPassword && <p className="text-red-500 text-sm">Please, enter password</p>}
        {isLoginCredential && (
          <p className="text-red-500 text-sm">login or password entered incorrectly</p>
        )}
        <p className="italic text-gray-500 mb-2">
          don't have an account?{' '}
          <Link to="/register" className="underline decoration-zinc-500 text-zinc-950">
            go to register
          </Link>
        </p>
        <button className="h-[30px] w-[270px] rounded shadow-lg bg-gray-200 transition-all hover:shadow-xl">
          log in
        </button>
      </form>
      <div className="flex items-center mb-3">
        <div className="h-px bg-gray-400 w-16"></div>
        <span className="mx-2 text-gray-500">OR</span>
        <div className="h-px bg-gray-400 w-16"></div>
      </div>
      <button className="rounded bg-yellow-500 shadow-lg w-[270px] h-[30px] mb-3 hover:shadow-xl">
        authorization with google
      </button>
      <button className="rounded bg-[#000] text-white  shadow-lg w-[270px] h-[30px] hover:shadow-xl">
        authorization with github
      </button>
    </div>
  );
}

export default LoginPage;
