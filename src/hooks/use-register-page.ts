import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { PASSWORD_LENGTH_MIN } from '../shared/consts/authorization';

enum EnumErrors {
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
  INVALID_EMAIL = 'auth/invalid-email'
}

function useRegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [isUseEmail, setIsUseEmail] = useState(false);
  const navigateToLogIn = useNavigate();

  const formHandler = (e: FormEvent) => {
    e.preventDefault();
    if (password.length < PASSWORD_LENGTH_MIN) {
      setPasswordLength(true);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setPasswordLength(false);
          setIsInvalidEmail(false);
          setIsUseEmail(false);
          navigateToLogIn('/');
        })
        .catch((err) => {
          if (err.code === EnumErrors.EMAIL_ALREADY_IN_USE) {
            setIsUseEmail(true);
            setIsInvalidEmail(false);
            setPasswordLength(false);
          } else if (err.code === EnumErrors.INVALID_EMAIL) {
            setIsInvalidEmail(true);
            setIsUseEmail(false);
            setPasswordLength(false);
          } else {
            setPasswordLength(false);
          }
        });
    }
  };

  const emailInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsInvalidEmail(false);
    setIsUseEmail(false);
    setEmail(e.target.value);
  };

  const passwordInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(false);
    setPassword(e.target.value);
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
