import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import useHomePage from '../hooks/use-home-page.hook';

function Header() {
  const { setCreateTodo } = useHomePage();
  const navigateToLoginPage = useNavigate();

  const logOutHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    signOut(auth).then(() => {
      localStorage.removeItem('user');
      navigateToLoginPage('/login');
    });
  };

  const createButtonHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (setCreateTodo) {
      setCreateTodo(true);
    }
  };

  return (
    <div className=" py-2 px-4 bg-blue-500 shadow-lg h-[50px] w-screen flex justify-around items-center">
      <input
        type="text"
        className=" py-2 px-4 h-[30px] w-[270px] rounded"
        placeholder="search todo"
      ></input>
      <button
        className="rounded bg-white h-[30px] w-[270px] hover:bg-black hover:text-white"
        onClick={createButtonHandler}
      >
        Create
      </button>
      <button
        className="rounded bg-black text-white h-[30px] w-[270px] hover:bg-white hover:text-black"
        onClick={logOutHandler}
      >
        log out
      </button>
    </div>
  );
}

export default Header;
