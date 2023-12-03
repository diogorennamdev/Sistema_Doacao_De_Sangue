import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexts/useAuth';
import Popup from '../../components/PopUp';
import List from '../../components/List';
import Input from '../../components/Input';
import AlertDialog from '../../components/AlertDialog';
import SuccessDialog from '../../components/SuccessDialog';
import Loading from '../../components/Loading';
import { FaSearch } from "react-icons/fa";
import './styles.css'

function EmployeeList() {
  const { userData } = useAuth();
  const token = userData.token;
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [userSelected, setUserSelected] = useState('');
  const employee = import.meta.env.VITE_EMPLOYEES;
  const [alertType, setAlertType] = useState('')
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [personCode, setPersonCode] = useState('');
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [passwordType, setPasswordType] = useState(false);

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

  const handleClosePopup = () => {
    setShowPopup(false);
    setUserSelected('')
  };

  const onClickModal = (user) => {
    setUserSelected(user); // Atualizar o estado com o usuário clicado
    setShowPopup(true);
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    setAlertMessage('');
    setAlertTitle('');
    setPassword('')
    setPersonCode('')
    setAlertType('')

  };

  const onClickUpdate = (newName, password) => {
    if (newName === userSelected.name && (password === userSelected.password || password === '')) {
      setShowAlertDialog(true);
      setAlertTitle('Atenção');
      setAlertMessage('É necessário alterar o nome ou adicionar uma nova senha para atualizar!');
      return;
    }

    if (newName && newName.length < 3) {
      setShowAlertDialog(true);
      setAlertTitle('Atenção');
      setAlertMessage('O nome precisa ter no mínimo 3 caracteres!');
      return;
    }

    if (password && password.length < 8) {
      setShowAlertDialog(true);
      setAlertTitle('Atenção');
      setAlertMessage('Sua senha precisa ter no mínimo 8 caracteres!');
      return;
    }

    try {
      employeeUpdate(newName, password);
    } catch (error) {
      console.error(error);
    }
  };

  const employeeUpdate = async (newName, password) => {
    const updatedEmployee = {};
    if (newName) {
      updatedEmployee.name = newName;
      setPasswordType(false); // Adicione esta linha
    }
    if (password) {
      updatedEmployee.password = password;
      setPasswordType(true);
      setPassword(password); // Definir a nova senha
    }

    try {
      const response = await axios.patch(`${employee}${userSelected.employeeCode}`, updatedEmployee, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setShowPopup(false);
        setAlertType('success');
        setShowSuccessDialog(true);
        if (newName) {
          setAlertMessage('Nome atualizado com sucesso!');
          setAlertTitle('Sucesso!');
        } 
        if (password) {
          setAlertMessage('Senha atualizada com sucesso!');
          setAlertTitle('Sucesso!');
          setPasswordType(true);
          setPassword(password);
        }

        // Refaça a chamada à API para buscar os dados atualizados
        const updatedResponse = await axios.get(`${employee}?name=${searchTerm}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Atualize o estado com os novos dados
        setEmployees(updatedResponse.data);
      }
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

      {loading ? (
        <Loading />
      ) : (
        <List
          users={employees}
          onClick={(user) => onClickModal(user)}
        />
      )}

      <Popup
        type={'employee'}
        show={showPopup}
        handleClose={handleClosePopup}
        userData={userSelected}
        onClick={onClickUpdate}
      />

      <AlertDialog
        show={showAlertDialog}
        handleClose={() => setShowAlertDialog(false)}
        title={alertTitle}
        message={alertMessage}
      />

      <SuccessDialog
        handleClose={handleCloseSuccessDialog}
        show={showSuccessDialog}
        message={alertMessage}
        title={alertTitle}
        type={alertType}
        password={password}
        personCode={personCode.toString()}
        passwordType={passwordType}
      />

    </div>
  );
}

export default EmployeeList;
