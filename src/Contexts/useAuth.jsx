import { useContext } from 'react';
import { AuthContext } from './useContext';

export const useAuth = () => {
    return useContext(AuthContext);
};
