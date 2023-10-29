import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { PASSWORD_LENGTH_MIN } from '../shared/consts/authorization';
import { EnumErrors } from '../shared/consts/enum';
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
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  // const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
  // const [passwordLength, setPasswordLength] = useState<boolean>(false);
  // const [isUseEmail, setIsUseEmail] = useState<boolean>(false);
  const navigateToLogIn = useNavigate();

  const formHandler = (event: FormEvent) => {
    event.preventDefault();
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
    }
  };

  // const emailInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setIsInvalidEmail(false);
  //   setIsUseEmail(false);
  //   setEmail(event.target.value);
  // };

  // const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPasswordLength(false);
  //   setPassword(event.target.value);
  // };

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
