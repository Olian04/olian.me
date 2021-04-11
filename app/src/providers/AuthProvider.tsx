import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { onLoginStatusChange } from '../services/firebase/auth';
import { isAuthenticated } from '../state/user';

export const AuthProvider = () => {
  const setIsAuth = useSetRecoilState(isAuthenticated);

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
