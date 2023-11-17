import React, { useContext } from 'react';
import { useAuth } from '../../Contexts/useContext';
import './styles.css';

function Home() {
  const { userData, logout } = useAuth(); // Obtendo os dados do contexto

  return (
    <div>
      <h2>Home</h2>
      {userData ? (
        <div>
          <p>Welcome, {userData.token}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please login to view this content.</p>
      )}
    </div>
  );
}

export default Home;
