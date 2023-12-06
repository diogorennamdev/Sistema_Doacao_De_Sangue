import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexts/useAuth';
import PropTypes from 'prop-types';
import Input from '../Input';
import Button from '../Button';
import SuccessDialog from '../SuccessDialog';
import AlertDialog from '../AlertDialog';
import { IoCloseCircleSharp } from 'react-icons/io5';

import './styles.css';

function RegisterEmployee({ onClose, updateEmployeeList }) {
  const { userData } = useAuth();
  const token = userData.token;
  const ApiUrl = import.meta.env.VITE_EMPLOYEES;
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [messageBoxTitle, setMessageBoxTitle] = useState('');
  const [personCode, setPersonCode] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleAdminPermissionChange = (event) => {
    setIsAdmin(event.target.value === 'true');
  };

  const handleName = (e) => {
    const newName = e.target.value;
    setName(newName);

    // Name validation with a minimum of 3 characters
    if (newName.length >= 3) {
      setNameError('');
    } else {
      setNameError('O nome precisa ter no mínimo 3 caracteres.');
    }
  };

  const handlePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Password validation with a minimum of 8 characters
    if (newPassword.length >= 8) {
      setPasswordError('');
    } else {
      setPasswordError('A senha precisa ter no mínimo 8 caracteres.');
    }
  };

  function clearFields() {
    setIsAdmin(false);
    setName('');
    setPassword('');
    setPasswordError(true);
    setPassword('');
    setPersonCode('');
    setMessageBoxTitle('');
    setType('');
    setMessage('');
  }

  const handleSubmit = async () => {
    if (!name || !password) {
      setShow(true);
      setMessageBoxTitle('Atenção!');
      setMessage('Preencha todos os campos!');
      setType('alert');
      return;
    }

    if (name.length < 3) {
      setShow(true);
      setMessageBoxTitle('Atenção!');
      setMessage('O nome precisa ter no mínimo 3 caracteres!');
      setType('alert');
      return;
    }

    if (password.length < 8) {
      setShow(true);
      setMessageBoxTitle('Atenção!');
      setMessage('A senha precisa ter no mínimo 8 caracteres!');
      setType('alert');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        ApiUrl,
        {
          name: name,
          password: password,
          isAdmin: isAdmin,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setMessage('Funcionário cadastrado com Sucesso!');
        setShow(true);
        setLoading(false);
        setType('success');
        setMessageBoxTitle('Sucesso!');
        setMessage('Funcionário cadastrado com Sucesso!');
        setPassword(response.data.Funcionário.Senha);
        setPersonCode(response.data.Funcionário.Código);
        setShowSuccessDialog(true);

        // chamada da função que atualiza a lista de funcionários
        updateEmployeeList();
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      if (error.response && error.response.status === 401) {
        setLoading(false);
        console.log('Usuário não autorizado!');
        return;
      }
      setShow(true);
      setLoading(false);
      setMessageBoxTitle('Atenção!');
      setMessage(error.response.data.error);
      setType('alert');
    }
  };

  const handleCloseBox = async () => {
    setShowSuccessDialog(false);
    setShow(false);
    clearFields();
  };

  return (
    <div className='SectionRegisterEmployee'>
      <div className="ContainerRegisterEmployee">
        <IoCloseCircleSharp onClick={onClose} className='closeIcon' />
        <h1>Cadastrar Funcionário</h1>
        <div className="ContainerInputEmployee">
          <div className='LabelEmployee'>
            <label htmlFor="name" className='labelStyleEmployee'>Nome:</label>
            <Input
              id="name"
              type={'text'}
              placeholder={'Digite o nome do funcionário'}
              value={name}
              onChange={handleName}
            />
          </div>
          {nameError && <p className="textError">{nameError}</p>}
          <div className='LabelEmployee'>
            <label htmlFor="password" className='labelStyleEmployee'>Senha:</label>
            <Input
              id='password'
              value={password}
              type={'password'}
              placeholder={'Digite a senha do funcionário'}
              onChange={handlePassword}
            />
          </div>
          {passwordError && <p className="textError">{passwordError}</p>}
        </div>
        <h3 className='TitleTypeUser'>Atribuir permissão de administrador?</h3>
        <div className='containerSectionRadio'>
          <div className='cardInputRadio'>
            <input
              className='custom-radio'
              type="radio"
              value={'true'}
              checked={isAdmin}
              onChange={handleAdminPermissionChange}
            />
            <label>Sim</label>
          </div>
          <div className='cardInputRadio'>
            <input
              type="radio"
              value={'false'}
              checked={!isAdmin}
              onChange={handleAdminPermissionChange}
            />
            <label htmlFor="">Não</label>
          </div>
        </div>
        <Button
          TextButton={'Criar Funcionário'}
          onClick={() => handleSubmit()}
          loading={loading}
        />
      </div>
      {
        show && type === 'success' && (
          <SuccessDialog
            show={showSuccessDialog}
            handleClose={handleCloseBox}
            title={messageBoxTitle}
            message={message}
            password={password}
            personCode={personCode}
            createType={true}
          />
        )
      }
      {
        show && type === 'alert' && (
          <AlertDialog
            show={show}
            handleClose={handleCloseBox}
            title={messageBoxTitle}
            message={message}
          />
        )
      }
    </div >
  );
}

RegisterEmployee.propTypes = {
  onClose: PropTypes.func.isRequired,
  updateEmployeeList: PropTypes.func.isRequired,
};

export default RegisterEmployee;
