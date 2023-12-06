import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexts/useAuth';
import List from '../../components/List';
import Input from '../../components/Input';
import AlertDialog from '../../components/AlertDialog';
import SuccessDialog from '../../components/SuccessDialog';
import Loading from '../../components/Loading';
import { IoSearch } from 'react-icons/io5';
import { BsPersonFillAdd } from 'react-icons/bs';
import RegisterEmployee from '../../components/RegisterEmployee';
import FormEmployee from '../../components/FormEmployee';

import './styles.css';

function EmployeeList() {
  const { userData } = useAuth();
  const token = userData.token;
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [userSelected, setUserSelected] = useState('');
  const employee = import.meta.env.VITE_EMPLOYEES;
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [personCode, setPersonCode] = useState('');
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [passwordType, setPasswordType] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [errorSearchTerm, setErrorSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios.get(`${employee}?name=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const responseData = Array.isArray(response.data) ? response.data : [response.data];

        const sortedEmployees = responseData.toSorted((a, b) => a.name.localeCompare(b.name));

        setEmployees(sortedEmployees);
        setLoading(false);
        setErrorSearchTerm('');
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setErrorSearchTerm(searchTerm);
        } else {
          console.error('Algo deu errado!', error);
        }
        setLoading(false);
      });
  }, [employee, token, searchTerm]);

  const handleCloseEditEmployee = () => {
    setShowEditEmployee(false);
    setUserSelected('');
    setIsEditing(false); // Adicionado para fechar o EditEmployee quando necessário
  };

  const handleOpenEdit = (user) => {
    setUserSelected(user);
    setIsEditing(true);
    setShowEditEmployee(true);

  };

  const handleOpenDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteDialog(true);
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    setAlertMessage('');
    setAlertTitle('');
    setPassword('');
    setPersonCode('');
    setAlertType('');
    setIsEditing(false);
  };

  const updateEmployeeList = async () => {
    try {
      const response = await axios.get(`${employee}?name=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = Array.isArray(response.data) ? response.data : [response.data];

      const sortedEmployees = responseData.toSorted((a, b) => a.name.localeCompare(b.name));
      
      setEmployees(sortedEmployees);

    } catch (error) {
      console.error('Error updating employee list:', error);
    }
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

    employeeUpdate(newName, password).catch(error => {
      console.error(error);
    });
  };

  const employeeUpdate = async (newName, password) => {
    const updatedEmployee = {};
    if (newName) {
      updatedEmployee.name = newName;
      setPasswordType(false);
    }
    if (password) {
      updatedEmployee.password = password;
      setPasswordType(true);
      setPassword(password);
    }

    try {
      const response = await axios.patch(`${employee}${userSelected.employeeCode}`, updatedEmployee, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setShowEditEmployee(false);
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

        updateEmployeeList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`${employee}${userToDelete.employeeCode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShowDeleteDialog(false);
      setUserToDelete(null);

      updateEmployeeList();
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 403) {
        setAlertType('error');
        setAlertMessage('Não é possível excluir um funcionário administrador!');
        setAlertTitle('Atenção!');
        setShowAlertDialog(true);
        return;
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className='ContainerEmployee'>
      <h1 className='ContainerEmployeeTitle'>Funcionários</h1>
      <div className='ContainerHeadSearch'>
        <div className='SearchInput'>
          <IoSearch className='SearchIcon' />
          <Input
            placeholder={'Pesquise pelo nome do funcionário'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='InputSearchEmployee'
          />
        </div>
        <div>
          <button onClick={() => setShowRegister(true)} className='AddButton'>
            <BsPersonFillAdd className='AddIcon' /> Adicionar
          </button>
        </div>
      </div>

      {showRegister && <RegisterEmployee onClose={() => setShowRegister(false)} updateEmployeeList={updateEmployeeList} />}

      {errorSearchTerm && searchTerm !== '' ? (
        <p>O texto &quot;{searchTerm}&quot; não corresponde a nenhum funcionário!</p>
      ) : (
        <>
          {loading ? (
            <Loading />
          ) : (
            <List
              users={employees}
              onClick={(user) => handleOpenEdit(user)}
              onDelete={(user) => handleOpenDelete(user)}
            />
          )}
        </>
      )}
      {isEditing && (
        <FormEmployee
          type={'employee'}
          show={showEditEmployee}
          handleClose={handleCloseEditEmployee}
          userData={userSelected}
          setPassword={setPassword}
          onClick={(newName, password) => {
            onClickUpdate(newName, password);
          }}
        />
      )}

      <AlertDialog
        show={showAlertDialog}
        handleClose={() => setShowAlertDialog(false)}
        title={alertTitle}
        message={alertMessage}
      />

      <AlertDialog
        show={showDeleteDialog}
        handleClose={() => setShowDeleteDialog(false)}
        title='Atenção'
        message={`Deseja excluir o funcionário ${userToDelete?.name}?`}
        onConfirm={deleteUser}
        showConfirmButtons={true}
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
