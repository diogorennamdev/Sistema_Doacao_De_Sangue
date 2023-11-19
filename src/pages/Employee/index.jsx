import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexts/useAuth';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

function EmployeeList() {

  const { userData } = useAuth();
  const token = userData.token
  //console.log(token)

  const [employees, setEmployees] = useState([]);
  const employee = import.meta.env.VITE_EMPLOYEES;

  //console.log(employees)
  useEffect(() => {
    axios.get(`${employee}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Algo deu errado!', error);
      });
  }, [employee, token]);

  return (
    <div>
      <h1>Todos Funcionários</h1>
      {employees.map((employee) => (
        <div key={employee.employeeCode}>
          <p>{employee.name}</p>
          <div key={employee.employeeCode}>
            <button>Editar</button>
          </div>
        </div>
        ))}
      <button>
        <Link to={'/home'}>
          Voltar
        </Link>
      </button>
      <Button>

      </Button>
    </div>
  );
}

export default EmployeeList;
