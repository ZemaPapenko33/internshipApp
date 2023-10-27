import { signInWithEmailAndPassword } from 'firebase/auth';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { EnumErrors } from '../shared/consts/enum';

interface ILoginPageHook {
  isMissingPassword: boolean;
  isLoginCredential: boolean;
  formHandler: (event: FormEvent) => void;
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
  return { isMissingPassword, isLoginCredential, formHandler };
}
export default useLoginPage;
