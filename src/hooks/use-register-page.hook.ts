import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { PASSWORD_LENGTH_MIN } from '../shared/consts/authorization';
import { EnumErrors, MyRoutes } from '../shared/enum';
import { useForm } from '../context';

interface IRegisterPageHook {
  email: string;
  password: string;
  isInvalidEmail: boolean;
  passwordLength: boolean;
  isUseEmail: boolean;
  formHandler: (event: FormEvent) => void;
  emailInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function useRegisterPage(): IRegisterPageHook {
  const {
    email,
    password,
    isInvalidEmail,
    passwordLength,
    isUseEmail,
    setIsInvalidEmail,
    setIsUseEmail,
    setPasswordLength,
    emailInputHandler,
    passwordInputHandler
  } = useForm();
  const navigateToLogIn = useNavigate();

  const formHandler = (event: FormEvent) => {
    event.preventDefault();
    if (password.length < PASSWORD_LENGTH_MIN) {
      setPasswordLength(true);
    } else {
      try {
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            setPasswordLength(false);
            setIsInvalidEmail(false);
            setIsUseEmail(false);
            localStorage.setItem('user', email);
            localStorage.setItem('email', email);
            navigateToLogIn(MyRoutes.HOME_ROUTE);
          })
          .catch((error) => {
            if (error.code === EnumErrors.EMAIL_ALREADY_IN_USE) {
              setIsUseEmail(true);
              setIsInvalidEmail(false);
              setPasswordLength(false);
            } else if (error.code === EnumErrors.INVALID_EMAIL) {
              setIsInvalidEmail(true);
              setIsUseEmail(false);
              setPasswordLength(false);
            } else {
              setPasswordLength(false);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    email,
    password,
    isInvalidEmail,
    passwordLength,
    isUseEmail,
    formHandler,
    emailInputHandler,
    passwordInputHandler
  };
}

export default useRegisterPage;
