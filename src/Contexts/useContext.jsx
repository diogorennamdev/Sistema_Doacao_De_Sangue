import React, { useState, createContext, useContext } from 'react';

// Criação do contexto de autenticação
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Verifica se existem dados de usuário no localStorage ao inicializar
    const initialUserData = JSON.parse(localStorage.getItem('userData')) || null;

    // Estado para armazenar os dados do usuário
    const [userData, setUserData] = useState(initialUserData);
    // console.log(userData)
    // Função para realizar o login
    const login = (userData) => {
        setUserData(userData);
        // Salva os dados do usuário no localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    // Função para realizar o logout
    const logout = () => {
        setUserData(null);
        // Remove os dados do usuário do localStorage
        localStorage.removeItem('userData');
    };

    // Função para obter os dados do usuário
    const getUserData = () => {
        return userData;
    };

    // Retorna o provedor de contexto de autenticação com o valor fornecido
    return (
        <AuthContext.Provider value={{ userData, login, logout, getUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = () => {
    return useContext(AuthContext);
};
