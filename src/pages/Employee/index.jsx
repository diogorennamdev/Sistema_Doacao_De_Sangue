import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexts/useAuth';
import Popup from '../../components/PopUp';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import { FaSearch } from "react-icons/fa";
import './styles.css'

function EmployeeList() {
  const { userData } = useAuth();
  const token = userData.token;
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [userSelected, setUserSelected] = useState('');
  console.log(userSelected)
  const employee = import.meta.env.VITE_EMPLOYEES;

  useEffect(() => {
    setLoading(true); // Ativar o estado de carregamento antes da requisição

    axios.get(`${employee}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setEmployees(response.data);
        setLoading(false); // Desativar o estado de carregamento após a requisição ser completada
      })
      .catch(error => {
        console.error('Algo deu errado!', error);
        setLoading(false); // Certifique-se de desativar o estado de carregamento em caso de erro também
      });

  }, [employee, token]);

  const handleCloseModal = () => {
    setShow(false);
    setUserSelected('')
  };

  const onClickModal = (user) => {
   setUserSelected(user); // Atualizar o estado com o usuário clicado
    setShow(true);
  };
  return (
    <div className='ContainerEmployee'>
      <h1>Todos Funcionários</h1>
      <div className='ContainerSearchEmployee'>
        <FaSearch />
        <Input
          placeholder={'Pesquise pelo nome do funcionário'}
        />
      </div>

      {loading ? ( // Mostrar componente de Loading enquanto estiver carregando
        <Loading />
      ) : (
        <Card
          users={employees}
          onClick={(user) => onClickModal(user)}
        />
      )}
      <Popup
        show={show}
        handleClose={handleCloseModal}
        userData={userSelected}
      />
    </div>
  );
}

export default EmployeeList;
