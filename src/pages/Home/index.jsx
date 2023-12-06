import { useAuth } from '../../Contexts/useAuth';
import { Link } from 'react-router-dom';

import './styles.css';

function Home() {
  const { userData } = useAuth();

  const renderWelcomeMessage = () => {
    if (userData) {
      return (
        <div className='WelcomeMessage'>
          <h2>Bem-Vindo, {userData.data.Nome}!</h2>
          <p>Aqui estão algumas tarefas que você pode realizar hoje:</p>
        </div>
      );
    }
    return <h2>Bem-vindo ao nosso Hemocentro!</h2>;
  };

  const renderCard = (link, text, description) => (
    <div className="Card">
      <Link to={link}>
        <h3>{text}</h3>
        <p>{description}</p>
      </Link>
    </div>
  );
  console.log(userData)


  return (
    <main>
      <div className='ContainerHome'>
        {renderWelcomeMessage()}
        <div className='CardsHome'>
          {renderCard("/doador", "Gerenciar Doadores", "Visualize e gerencie todos os doadores")}
          {renderCard("/exame", "Adicionar Exames", "Adicione resultados de exames para doadores")}
          {renderCard("/estoque", "Estoque", "Verifique o estoque atual de sangue")}
          {userData?.information?.isAdmin && renderCard("/funcionario", "Gerenciar funcionários", "Visualize e gerencie todos os funcionários")}
        </div>
      </div>
    </main>
  );
}

export default Home;
