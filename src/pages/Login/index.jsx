import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate
import {Logo} from '../../components/Logo';
import { IoMdPerson, IoMdKey, IoMdEye, IoMdEyeOff } from 'react-icons/io';
import './styles.css'

import Input from '../../components/Input';
import Button from '../../components/Button';
import AlertDialog from '../../components/AlertDialog';

import axios from 'axios';
import { AuthContext } from '../../Contexts/useContext';

function Login() {
  const { login } = useContext(AuthContext);

  const Login = import.meta.env.VITE_LOGIN;
  const navigate = useNavigate();

  const [employeeCode, setEmployeeCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const extractUserDataFromToken = (token) => {
    const tokenParts = token.split('.');
    const encodedPayload = tokenParts[1];
    const decodedPayload = atob(encodedPayload);
    const employeeData = JSON.parse(decodedPayload);
    return employeeData;
  };

  const loginUser = async (event) => {
    event.preventDefault();
    if (employeeCode.trim() === '' || password.trim() === '') {
      setTitle('Atenção');
      setMessage('Preencha todos os campos para continuar.');
      handleShow();
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${Login}`, {
        employeeCode: employeeCode,
        password: password
      })
      //console.log(response.data)
      const token = response.data.token;
      // Obter os dados do usuário a partir do token
      const employeeData = extractUserDataFromToken(token);
      const DataEmployee = {
        data: response.data.Funcionário,
        information: employeeData,
        token: response.data.token
      };

      login(DataEmployee);
      setLoading(false);

      if (response.status === 200) {
        navigate('/inicio'); // Navegue para a página inicial
      }

    } catch (error) {
      setLoading(false);
      if (error.response && (error.response.status === 400 || error.response.status === 500)) {
        setTitle(`Erro`);
        const errorMessage = error.response.data.error; // Extrai a mensagem de erro
        setMessage(errorMessage); // Define a mensagem para a mensagem de erro extraída
        handleShow();
      }
    }
  }

  return (
    <main className='ContainerLogin'>
      <div className='ContainerForm'>
        <Logo />
        <form className='CardForm' onSubmit={loginUser}>
          <h2 className='CardTitle'>Bem-Vindo!</h2>
          <span className='CardSubtitle'>Faça seu Login</span>
          <div className='CardDot'>
            <hr /> • <hr />
          </div>
          <span>Informações de Login</span>
          <div className="CardData">
            <label htmlFor="employ"><IoMdPerson />Código do funcionário:</label>
            <Input
              id='employ'
              placeholder={'Digite o código'}
              type={'number'}
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value)}
              className="employee-input noArrows"
            />
            <label htmlFor="password"><IoMdKey />Senha:</label>
            <div className="password-input">
              <Input
                className='password'
                placeholder={'Digite a senha'}
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? <IoMdEyeOff title='Ocultar senha' /> : <IoMdEye title='Mostrar senha' />}
              </button>

            </div>
          </div>
          <div className='ContainerButton' >
            <Button
              loading={loading}
              TextButton={'ENTRAR'}
            />
          </div>
          <AlertDialog show={show} handleClose={handleClose} title={title} message={message} />
        </form>
      </div>
    </main>
  );
}

export default Login;
