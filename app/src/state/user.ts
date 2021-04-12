import { atom, selector } from 'recoil';
import { getCurrentUser } from '../services/firebase/auth';
import { User } from '../types/User';

export const userIsAuthenticatedState = atom<boolean>({
  key: 'USER_IS_AUTH',
  default: false,
});

export const userData = selector<User | null>({
  key: 'USER_DATA',
  get: ({ get }) => {
    const isAuth = get(userIsAuthenticatedState);
    if (!isAuth) {
      return null;
    }
    const firebaseUser = getCurrentUser();
    if (firebaseUser === null) {
      return null;
    }
    return {
      name: firebaseUser.displayName ?? 'N/A',
    };
  },
});
