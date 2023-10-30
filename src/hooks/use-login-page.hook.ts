import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { EnumErrors } from '../shared/consts/enum';

interface ILoginPageHook {
  isMissingPassword: boolean;
  isLoginCredential: boolean;
  formHandler: (event: FormEvent) => void;
  googleButtonHandler: (event: React.MouseEvent) => void;
  githubButtonHandler: (event: React.MouseEvent) => void;
}

function useLoginPage(email: string, password: string): ILoginPageHook {
  const [isMissingPassword, setIsMissingPassword] = useState<boolean>(false);
  const [isLoginCredential, setIsLoginCredential] = useState<boolean>(false);
  const navigateToHomePage = useNavigate();

  const formHandler = (event: FormEvent) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigateToHomePage('/');
      })
      .catch((error) => {
        if (error.code === EnumErrors.MISSING_PASSWORD) {
          setIsLoginCredential(false);
          setIsMissingPassword(true);
        } else if (error.code === EnumErrors.INVALID_LOGIN_CREDENTIAL) {
          setIsMissingPassword(false);
          setIsLoginCredential(true);
        }
      });
  };
  const googleButtonHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();
    signInWithPopup(auth, provider).then(() => {
      navigateToHomePage('/');
    });
  };
  const githubButtonHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    const provider = new GithubAuthProvider();
    auth.useDeviceLanguage();
    signInWithPopup(auth, provider).then(() => {
      navigateToHomePage('/');
    });
  };
  return {
    isMissingPassword,
    isLoginCredential,
    formHandler,
    googleButtonHandler,
    githubButtonHandler
  };
}
export default useLoginPage;
