import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexts/useAuth';
import Popup from '../../components/PopUp';
import List from '../../components/List';
import Input from '../../components/Input';
import AlertDialog from '../../components/AlertDialog';
import Loading from '../../components/Loading';
import { FaSearch } from "react-icons/fa";
import './styles.css'

function EmployeeList() {
  const { userData } = useAuth();
  const token = userData.token;
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false)
  const [userSelected, setUserSelected] = useState('');
  const employee = import.meta.env.VITE_EMPLOYEES;
  const [type, setType] = useState('')
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [personCode, setPersonCode] = useState('');
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    setLoading(true);

    axios.get(`${employee}?name=${searchTerm}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Algo deu errado!', error);
        setLoading(false);
      });

  }, [employee, token, searchTerm]);


  const handleCloseModal = () => {
    setShow(false);
    setUserSelected('')
  };

  const onClickModal = (user) => {
    setUserSelected(user); // Atualizar o estado com o usuário clicado
    setShow(true);
  };

  const handleCloseAlertDialog = () => {
    setShowAlertDialog(false);
    setMessage('');
    setTitle('');
    setPassword('')
    setPersonCode('')
    setType('')

  };

  //verifica se existe o dado atualizado quando clico em atualizar se sim passo as novas informações e atualizo a o funcionário
  const onClickUpdate = (password) => {
    if (!password) {
      setShowAlertDialog(true);
      setMessage('É necessário inserir uma nova senha para atualizar!');
      setTitle('Atenção');
      return;
    }

    if (password.length < 8) {
      setShowAlertDialog(true);
      setMessage('Sua senha precisa ter no mínimo 8 caracteres!');
      setTitle('Atenção');
      return;
    }

    try {
      // Aqui, você pode chamar a função employeeUpdate para atualizar a senha
      employeeUpdate(password);
    } catch (error) {
      // Lide com o erro, se necessário
      console.error(error);
    }
  };

  const employeeUpdate = async (password) => {
    const updatedEmployee = {
      password: password
    };
    try {
      const response = await axios.patch(`${employee}${userSelected.employeeCode}`, updatedEmployee, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.status === 200) {
        setShow(false);
        setType('success');
        setShowAlertDialog(true);
        setMessage('Senha atualizada com sucesso!')
        setTitle('Sucesso!')
        setPersonCode(userSelected.employeeCode)
        setPassword(password);

      }
      console.log(response.data); // Se desejar, faça algo com a resposta da requisição
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='ContainerEmployee'>
      <h1>Todos Funcionários</h1>
      <div className='ContainerSearchEmployee'>
        <FaSearch />
        <Input
          placeholder={'Pesquise pelo nome do funcionário'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? ( // Mostrar componente de Loading enquanto estiver carregando
        <Loading />
      ) : (
        <List
          users={employees}
          onClick={(user) => onClickModal(user)}
        />
      )}

      <Popup
        type={'employee'}
        show={show}
        handleClose={handleCloseModal}
        userData={userSelected}
        onClick={onClickUpdate}
      />

      <AlertDialog
        handleClose={handleCloseAlertDialog}
        show={showAlertDialog}
        message={message}
        title={title}
        type={type}
        password={password}
        personCode={personCode}
      />
    </div>
  );
}

export default EmployeeList;
