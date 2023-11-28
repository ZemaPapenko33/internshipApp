import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLoginPage from '../hooks/use-login-page.hook';
import { useForm } from '../context';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import EmailInput from '../components/EmailInput/EmailInput';
import PasswordInput from '../components/PasswordInput/PasswordInput';
import SubtitleForm from '../components/SubtitleForm/SubtitleForm';
import FormRegisterAndAuth from '../components/FormRegisterAndAuth/FormRegisterAndAuth';
import LoginButton from '../components/LoginButton/LoginButton';
import GithubButton from '../components/GithubButton/GithubButton';
import GoogleButton from '../components/GoogleButton/GoogleButton';
import { RegisterAndAuthPageWrapper } from '../components/RegisterPageWrapper/RegisterAndAuthPageWrapper';

function LoginPage(): JSX.Element {
  const { email, password, emailInputHandler, passwordInputHandler } = useForm();
  const {
    formHandler,
    isLoginCredential,
    isMissingPassword,
    googleButtonHandler,
    githubButtonHandler
  } = useLoginPage(email, password);
  const user = localStorage.getItem('user');
  const navigateToHomePage = useNavigate();

  useEffect(() => {
    if (user) {
      navigateToHomePage('/');
    }
  }, [user]);

  return (
    <RegisterAndAuthPageWrapper>
      <FormRegisterAndAuth formHandler={formHandler}>
        <EmailInput emailInputHandler={emailInputHandler} />
        <PasswordInput passwordInputHandler={passwordInputHandler} />
        {isMissingPassword && <ErrorMessage>Please, enter password</ErrorMessage>}
        {isLoginCredential && <ErrorMessage>login or password entered incorrectly</ErrorMessage>}
        <SubtitleForm>
          don't have an account?{' '}
          <Link to="/register" className="underline decoration-zinc-500 text-zinc-950">
            Register
          </Link>
        </SubtitleForm>
        <LoginButton> Log in</LoginButton>
      </FormRegisterAndAuth>
      <div className="flex items-center mb-3">
        <div className="h-px bg-gray-400 w-16"></div>
        <span className="mx-2 text-gray-500">OR</span>
        <div className="h-px bg-gray-400 w-16"></div>
      </div>
      <GoogleButton googleButtonHandler={googleButtonHandler}>
        Authorization with google
      </GoogleButton>
      <GithubButton githubButtonHandler={githubButtonHandler}>
        Authorization with github
      </GithubButton>
    </RegisterAndAuthPageWrapper>
  );
}

export default LoginPage;
