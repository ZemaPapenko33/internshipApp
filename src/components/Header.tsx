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
    <div className=" py-2 px-4 bg-white shadow h-[50px] w-screen flex justify-around items-center">
      <input
        type="text"
        className=" py-2 px-4 h-[30px] w-[270px] rounded border-2"
        placeholder="Search todo"
      ></input>
      <button
        className="rounded bg-blue-500 h-[30px] w-[270px] text-white"
        onClick={createButtonHandler}
      >
        Create
      </button>
      <button className="rounded bg-blue-500 h-[30px] w-[270px] text-white" onClick={logOutHandler}>
        Log out
      </button>
    </div>
  );
}

export default Header;
