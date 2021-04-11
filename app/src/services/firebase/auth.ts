import { app } from './initializeService';
import firebase from 'firebase/app';
import 'firebase/auth';

const auth = app.auth();

export const loginWithGithub = async (): Promise<boolean> => {
  const githubAuthProvider = new firebase.auth.GithubAuthProvider();
  await auth.signInWithRedirect(githubAuthProvider);
  const userCredentials = await auth.getRedirectResult();
  if (!userCredentials) return false;
  return true;
};

export const logout = () => auth.signOut();

export const isLoggedIn = () => auth.currentUser !== null;

export const getCurrentUser = () => auth.currentUser;

export const onLoginStatusChange = (
  event: 'login' | 'logout',
  cb: () => void
) => {
  auth.onAuthStateChanged(() => {
    if (event === 'login' && isLoggedIn()) {
      cb();
    } else if (event === 'logout' && !isLoggedIn()) {
      cb();
    }
  });
};
