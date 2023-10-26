import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [isUseEmail, setIsUseEmail] = useState(false);
  const navigate = useNavigate();
  const formHandler = (e: FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setPasswordLength(true);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setPasswordLength(false);
          setIsInvalidEmail(false);
          setIsUseEmail(false);
          navigate('/');
        })
        .catch((err) => {
          if (err.code == 'auth/email-already-in-use') {
            setIsUseEmail(true);
            setIsInvalidEmail(false);
            setPasswordLength(false);
          } else if ((err.code = 'auth/invalid-email')) {
            setIsInvalidEmail(true);
            setIsUseEmail(false);
            setPasswordLength(false);
          } else {
            console.log(err.code);
            setPasswordLength(false);
          }
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  w-screen h-screen py-2 px-4">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={(e: FormEvent) => formHandler(e)}
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="mb-3 rounded px-2 shadow-lg h-[30px] w-[270px] border-2"
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => {
            setPassword(e.target.value);
          }}
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
          Registered
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
