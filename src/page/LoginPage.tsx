import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage(): JSX.Element {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  return (
    <div className="flex flex-col items-center justify-center  w-screen h-screen py-2 px-4">
      <form className="flex flex-col items-center justify-center mb-3">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="mb-3 rounded px-2 shadow-lg h-[30px] w-[270px] border-2"
          // onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="mb-2  rounded px-2 shadow-lg h-[30px] w-[270px] border-2"
          // onChange={(e) => setPassword(e.target.value)}
        />
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
      <button className="rounded bg-yellow-500 w-[270px] h-[30px] mb-3">
        authorization with google
      </button>
      <button className="rounded bg-[#000] text-white w-[270px] h-[30px]">
        authorization with github
      </button>
    </div>
  );
}

export default LoginPage;
