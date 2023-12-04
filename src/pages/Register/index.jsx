import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexts/useAuth';
import PropTypes from 'prop-types';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SuccessDialog from '../../components/SuccessDialog';
import AlertDialog from '../../components/AlertDialog';
import { IoCloseCircleSharp } from "react-icons/io5";

import './styles.css';

function Register({ onClose }) {
    const { userData } = useAuth();
    const token = userData.token;
    const ApiUrl = import.meta.env.VITE_EMPLOYEES;
    const [isAdmin, setIsAdmin] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('')
    const [messageBoxTitle, setMessageBoxTitle] = useState('');
    const [personCode, setPersonCode] = useState('');
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const handleAdminPermissionChange = (event) => {
        setIsAdmin(event.target.value === 'true');
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // Password validation with a minimum of 8 characters
        if (newPassword.length >= 8) {
            setIsPasswordValid(true);
        } else {
            setIsPasswordValid(false);
        }
    };

    function clearFields() {
        setIsAdmin(false);
        setName('');
        setPassword('');
        setIsPasswordValid(true);
        setPassword('');
        setPersonCode('');
        setMessageBoxTitle('');
        setType('');
        setMessage('');
    }

    const handleSubmit = async () => {
        console.log('handleSubmit chamado');

        if (name === '' || password === '') {
            setShow(true);
            setMessageBoxTitle('Atenção')
            setMessage('Preencha todos os campos!');
            setType('alert');
            return;
        }

        if (name.length < 3) {
            setShow(true);
            setMessageBoxTitle('Atenção')
            setMessage('O nome precisa ter no mínimo 3 caracteres!');
            setType('alert');
            return;
        }

        if (password.length < 8) {
            setShow(true);
            setMessageBoxTitle('Atenção')
            setMessage('A senha deve ter no mínimo 8 caracteres!');
            setType('alert');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(ApiUrl, {
                name: name,
                password: password,
                isAdmin: isAdmin
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Resposta da API:', response);

            if (response.status === 201) {
                setMessage('Funcionário cadastrado com sucesso!');
                setShow(true);
                setLoading(false);
                setType('success');
                setMessageBoxTitle('Sucesso!')
                setMessage('Funcionário cadastrado com sucesso!');
                setPassword(response.data.Funcionário.Senha);
                setPersonCode(response.data.Funcionário.Código)
                setShowSuccessDialog(true);
            }

        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
            if (error.response && error.response.status === 401) {
                setLoading(false);
                console.log('Usuário não autorizado!');
                return
            }
            setShow(true);
            setLoading(false);
            setMessageBoxTitle('Atenção')
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
        <div className='sectionRegister'>
            <div className="containerForm">
            <IoCloseCircleSharp onClick={onClose}/>
                <h1>Cadastrar Funcionário</h1>
                <div className="containerInput">
                    <label htmlFor="name" className='labelStyle'>Nome:</label>
                    <Input
                        id="name"
                        type={'text'}
                        placeholder={'Digite o nome do funcionário'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="containerInput">
                    <label htmlFor="password" className='labelStyle'>Senha:</label>
                    <Input
                        id='password'
                        value={password}
                        type={'password'}
                        placeholder={'Digite a senha do funcionário'}
                        onChange={handlePasswordChange}
                    />
                </div>
                {!isPasswordValid && (
                    <p className='textError'>A senha deve conter no mínimo 8 caracteres.</p>
                )}
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
            {show && type === 'success' && (
                <SuccessDialog
                    show={showSuccessDialog}
                    handleClose={handleCloseBox}
                    title={messageBoxTitle}
                    message={message}
                    password={password}
                    personCode={personCode}
                    createType={true}
                />
            )}
            {show && type !== 'success' && (
                <AlertDialog
                    show={show}
                    handleClose={handleCloseBox}
                    title={messageBoxTitle}
                    message={message}
                />
            )}
        </div>
    );
}

Register.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default Register;
