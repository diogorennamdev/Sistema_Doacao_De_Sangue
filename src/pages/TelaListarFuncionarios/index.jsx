import { useEffect, useState } from 'react';
import axios from 'axios';

function ListarFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    axios.get('')
      .then(response => {
        setFuncionarios(response.data);
      })
      .catch(error => {
        console.error('Algo deu errado!', error);
      });
  }, []);

  return (
    <div>
      <h1>Todos Funcionários</h1>
      {funcionarios.map(funcionario => (
        <div key={funcionario.id}>
          <p>{funcionario.nome}</p>
          <p>{funcionario.cargo}</p>
          <p>{funcionario.dataAdmissao}</p>
          <button>Editar</button>
        </div>
      ))}
      <button>Cadastrar Funcionário</button>
      <button>Cancelar</button>
    </div>
  );
}

export default ListarFuncionarios;
