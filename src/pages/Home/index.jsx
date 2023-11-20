import { useAuth } from '../../Contexts/useAuth';
import './styles.css';

function Home() {
  const { userData, logout } = useAuth(); // Obtendo os dados do contexto

  return (
    <div>
      
      {userData ? (
        <div>
          <p>Bem-Vindo, {userData.dados.Nome}!</p>
          <button onClick={logout}>Sair</button>
        </div>
      ) : (
        <p>Você não está logado.</p>
      )}
    </div>
  );
}

export default Home;
