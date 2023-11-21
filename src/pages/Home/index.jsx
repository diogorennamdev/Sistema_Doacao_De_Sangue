import { useAuth } from '../../Contexts/useAuth';
import Button from '../../components/Button';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';


import './styles.css';

function Home() {
  const { userData } = useAuth(); // Obtendo os dados do contexto
  const loading = useMemo(() => false, []);

  return (
    <main>
      <div className='container'>
        <h2 className='title'>INFORMAÇÕES DO HOMOCENTRO</h2>
        {userData ? (
          <div className='welcome'>
            <p>Bem-Vindo, {userData.dados.Nome}!</p>

          </div>
        ) : (
          <p>Você não está logado.</p>
        )}
        <div className='containerButton' >
          <Button
            loading={loading}
            TextButton={'Gerenciar Doadores'}
          />
          <Button
            loading={loading}
            TextButton={'Adicionar Exames'}
          />
          <Button
            loading={loading}
            TextButton={<Link to="/stock">ESTOQUE</Link>}
          />
          <Button
            loading={loading}
            TextButton={'Cadastro de funcionários'}
          />
        </div>
        
      </div>
    </main>
  );
}

export default Home;
