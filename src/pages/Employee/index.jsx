import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexts/useAuth';
import Popup from '../../components/PopUp';
function EmployeeList() {

  const { userData } = useAuth();
  const token = userData.token
  const [employees, setEmployees] = useState([]);
  const employee = import.meta.env.VITE_EMPLOYEES;
  const [showPopup, setShowPopup] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

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


  //console.log(editingEmployee.employeeCode)

  return (
    <div>
      <h1>Todos Funcionários</h1>
      {employees.map((employee) => (
        <div key={employee.employeeCode}>
          <p>{employee.name}</p>
          <div key={employee.employeeCode}>
            <button onClick={() => {
              setShowPopup(true);
              setEditingEmployee(employee);
            }}>Editar</button>
          </div>
        </div>
      ))}

      <Popup
        show={showPopup}
        employee={editingEmployee}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}

export default EmployeeList;
