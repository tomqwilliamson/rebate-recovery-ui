import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { User } from '../types/user.types';

export const useAuth = () => {
  const { user, isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  return {
    user: user as User | null,
    isAuthenticated,
    loading,
    error,
  };
};