import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';

function Header() {
  const navigateToLoginPage = useNavigate();
  const logOutHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    signOut(auth).then(() => {
      navigateToLoginPage('/login');
    });
  };
  return (
    <div className=" py-2 px-4 bg-blue-500 shadow-lg h-[50px] w-screen flex justify-around items-center">
      <input
        type="text"
        className=" py-2 px-4 h-[30px] w-[270px] rounded"
        placeholder="search todo"
      ></input>
      <button className="rounded bg-white h-[30px] w-[270px]">Create</button>
      <button className="rounded bg-black text-white h-[30px] w-[270px]" onClick={logOutHandler}>
        log out
      </button>
    </div>
  );
}

export default Header;
