import { useState } from 'react';
import heart from '/heart.svg';
import { IoMdPerson, IoMdKey } from 'react-icons/io';
import './styles.css'

import Input from '../../components/Input';
import Button from '../../components/Button';
import BoxDialog from '../../components/BoxDialog';

import axios from 'axios';

function Login() {

  const API_URL = import.meta.env.VITE_LOGIN;

  const [employeeCode, setEmployeeCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loginUser = async () => {
    if (employeeCode.trim() === '' || password.trim() === '') {
      handleShow();
      return;
    }    

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}`, {
        employeeCode: employeeCode,
        password: password
      })
      console.log(response.data);
      setLoading(false);

    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <main className='ContainerLogin'>
      <div className='ContainerForm'>
        <div className='ContainerLogo'>
          <img src={heart} alt="Logo" /><h1 className='ContainerTitle'>HemoVida Unifg</h1>
        </div>
        <div className='CardForm'>
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
              type={'name'}
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value)}
            />
            <label htmlFor="password"><IoMdKey />Senha:</label>
            <Input
              className='password'
              placeholder={'Digite a senha'}
              type={'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='ContainerButton' >
            <Button
              loading={loading}
              onclick={loginUser}
              TextButton={'ENTRAR'}
            />
          </div>

          <BoxDialog show={show} handleClose={handleClose} title="Atenção!" message="Preencha todos os campos para realizar o login" />

        </div>
      </div>
    </main>
  );
}

export default Login;
