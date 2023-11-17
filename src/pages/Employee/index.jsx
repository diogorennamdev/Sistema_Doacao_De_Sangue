import { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeList() {
  const [employes, setEmployee] = useState([]);

  useEffect(() => {
    axios.get('')
      .then(response => {
        setEmployee(response.data);
      })
      .catch(error => {
        console.error('Algo deu errado!', error);
      });
  }, []);

  return (
    <div>
      <h1>Todos Funcionários</h1>
      {employes.map(employee => (
        <div key={employee.id}>
          <p>{employee.nome}</p>
          <p>{employee.cargo}</p>
          <p>{employee.dataAdmissao}</p>
          <button>Editar</button>
        </div>
      ))}
      <button>Cadastrar Funcionário</button>
      <button>Cancelar</button>
    </div>
  );
}

export default EmployeeList;
