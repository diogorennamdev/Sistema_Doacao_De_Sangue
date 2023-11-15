import React, { useState } from 'react';
import ImgDonation from '../../assets/ImgDonation.svg';
import './LoginStyles.css'

import Input from '../../components/Input';
import Button from '../../components/Button';

import axios from 'axios';

function Login() {
  
  const API_URL = import.meta.env.VITE_LOGIN;

  const [employeeCode, setEmployeeCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const loginUser = async () => {
    if (employeeCode.trim() === '' || password.trim() === '') {
      alert('Preencha todos os campos para realizar o login');
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}`,{
        employeeCode: employeeCode,
        password: password
      })
     /// console.log(response.data);
      setLoading(false);

    } catch (error) {
      //console.log(error);
      setLoading(false);
    }
  }
  return (
    <main className='ContainerLogin'>
      <div className='CardImageDonation'>
        <img src={ImgDonation} alt="imagem representando doação de sangue" />
      </div>

      <div className='ContainerForm'>
        <div className='CardForm'>
          <h1>Sistema de Doação de Sangue</h1>

          <label htmlFor="employ">Código do funcionário:</label>
          <Input
            id='employ'
            placeholder={'Digite o código'}
            type={'name'}
            value={employeeCode}
            onChange={(e) => setEmployeeCode(e.target.value)}
          />

          <label htmlFor="password">Senha:</label>
          <Input
            className='password'
            placeholder={'Digite a senha'}
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


          <div className='ContainerButton' >
            <Button
              loading={loading}
              onclick={loginUser}
              TextButton={'ENTRAR'}
            />
          </div>

        </div>
      </div>
    </main>
  );
}

export default Login;
