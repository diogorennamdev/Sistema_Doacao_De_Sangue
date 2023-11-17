import { useAuth } from '../../Contexts/useAuth';
import './styles.css';

function Home() {
  const { userData, logout } = useAuth(); // Obtendo os dados do contexto

  return (
    <div>
      <h2>Home</h2>
      {userData ? (
        <div>
          <p>Welcome, {userData.dados.Nome}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please login to view this content.</p>
      )}
    </div>
  );
}

export default Home;
