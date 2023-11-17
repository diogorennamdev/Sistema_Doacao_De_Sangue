import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexts/useAuth';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

function EmployeeList() {
  
  const { userData} = useAuth();
  const token = userData.token
  //console.log(token)

  const [employes, setEmployee] = useState([]);
  const EMPLOYEE = import.meta.env.VITE_RETURNEMPLOYEES;

//console.log(employes)
useEffect(() => {
  axios.get(`${EMPLOYEE}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
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
      {employes.map((employee , index)=> (
        <div key={index}>
          <p>{employee.name}</p>
          <button>Editar</button>
        </div>
      ))}

    <button>
        <Link to = {'/home'}>
          Voltar
        </Link>
    </button>
    <Button>
      
    </Button>
    </div>
  );
}

export default EmployeeList;
