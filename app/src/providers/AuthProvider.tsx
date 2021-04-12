import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { onLoginStatusChange } from '../services/firebase/auth';
import { userIsAuthenticatedState } from '../state/user';

export const AuthProvider = () => {
  const setIsAuth = useSetRecoilState(userIsAuthenticatedState);

  useEffect(() => {
    onLoginStatusChange('login', () => {
      setIsAuth(true);
    });
    onLoginStatusChange('logout', () => {
      setIsAuth(false);
    });
  }, []);

  return null;
};
