import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmailInput from '../components/EmailInput/EmailInput';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import FormRegisterAndAuth from '../components/FormRegisterAndAuth/FormRegisterAndAuth';
import PasswordInput from '../components/PasswordInput/PasswordInput';
import RegisterButton from '../components/RegisterButton/RegisterButton';
import { RegisterAndAuthPageWrapper } from '../components/RegisterPageWrapper/RegisterAndAuthPageWrapper';
import SubtitleForm from '../components/SubtitleForm/SubtitleForm';
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
  const navigateToHomePage = useNavigate();
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (user) {
      navigateToHomePage('/');
    }
  }, [user]);

  return (
    <RegisterAndAuthPageWrapper>
      <FormRegisterAndAuth formHandler={formHandler}>
        <EmailInput emailInputHandler={emailInputHandler} />
        {isInvalidEmail && <ErrorMessage>Invalid Email</ErrorMessage>}
        {isUseEmail && (
          <ErrorMessage>
            Email already in use{' '}
            <Link to="/login" className="underline decoration-zinc-500 text-zinc-950">
              Login
            </Link>
          </ErrorMessage>
        )}
        <PasswordInput passwordInputHandler={passwordInputHandler} />
        {passwordLength && <ErrorMessage>enter a password longer than 8 characters</ErrorMessage>}
        <SubtitleForm>
          already have an account?{' '}
          <Link to="/login" className="underline decoration-zinc-500 text-zinc-950">
            Login
          </Link>
        </SubtitleForm>
        <RegisterButton>Register</RegisterButton>
      </FormRegisterAndAuth>
    </RegisterAndAuthPageWrapper>
  );
}

export default RegisterPage;
