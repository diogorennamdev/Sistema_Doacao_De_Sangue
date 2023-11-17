import PropTypes from 'prop-types';
import { useState, createContext, useContext, useMemo, useCallback } from 'react';

// Criação do contexto de autenticação
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Verifica se existem dados de usuário no localStorage ao inicializar
    const initialUserData = JSON.parse(localStorage.getItem('userData')) || null;

    // Estado para armazenar os dados do usuário
    const [userData, setUserData] = useState(initialUserData);

    // Função para realizar o login
    const login = useCallback((userData) => {
        setUserData(userData);
        // Salva os dados do usuário no localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
    }, []);

    // Função para realizar o logout
    const logout = useCallback(() => {
        setUserData(null);
        // Remove os dados do usuário do localStorage
        localStorage.removeItem('userData');
    }, []);

    // Função para obter os dados do usuário
    const getUserData = useCallback(() => {
        return userData;
    }, [userData]);

    // Memoize the value prop to prevent unnecessary re-renders
    const value = useMemo(() => ({ userData, login, logout, getUserData }), [userData, login, logout, getUserData]);

    // Retorna o provedor de contexto de autenticação com o valor fornecido
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = () => {
    return useContext(AuthContext);
};
