import { useRecoilValue } from 'recoil';
import { loginWithGithub, logout } from '../services/firebase/auth';
import { userData } from '../state/user';
import { User } from '../types/User';

export const useGithubAuth = (): [
  User | null,
  () => Promise<boolean>,
  () => Promise<void>
] => {
  const user = useRecoilValue(userData);
  return [user, loginWithGithub, logout];
};
