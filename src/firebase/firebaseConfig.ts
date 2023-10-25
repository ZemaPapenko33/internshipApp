import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const app = initializeApp({
  apiKey: 'AIzaSyDn-Id_RdPIBs_sZUqLeJ6XWqtFp-EWBvo',
  authDomain: 'jira-template-todo.firebaseapp.com',
  projectId: 'jira-template-todo',
  storageBucket: 'jira-template-todo.appspot.com',
  messagingSenderId: '269699191371',
  appId: '1:269699191371:web:b5dea39391ccfea34933ce',
  measurementId: 'G-3874HD577W'
});

export const auth = getAuth(app);
export default app;
