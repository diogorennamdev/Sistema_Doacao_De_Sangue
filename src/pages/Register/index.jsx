import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexts/useAuth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SuccessDialog from '../../components/SuccessDialog';
import AlertDialog from '../../components/AlertDialog';
import './styles.css';

function Register() {
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
        if (name === '' || password === '') {
            setMessage('Preencha todos os campos!');
            setShow(true);
            setMessageBoxTitle('Atenção')
            setType('alert');
            return;
        }

        if (password.length < 8) {
            setMessage('A senha deve ter no mínimo 8 caracteres!');
            setShow(true);
            setMessageBoxTitle('Atenção')
            setType('alert');
            return;
        }

        const user = {
            name: name,
            password: password,
            isAdmin: isAdmin
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            setLoading(true);
            const response = await axios.post(ApiUrl, user, config);

            if (response.status === 201) {
                setMessage('Funcionário cadastrado com sucesso!');
                setShow(true);
                setLoading(false);
                setType('success');
                setMessageBoxTitle('Sucesso!')
                setPassword(response.data.Funcionário.Senha);
                setPersonCode(response.data.Funcionário.Código)
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setLoading(false);
                console.log('Usuário não autorizado!');
                // TODO: redirecionar para a página de login
                return
            }
            setMessage(error.response.data.error);
            setShow(true);
            setLoading(false);
            setMessageBoxTitle('Atenção')
            setType('alert');
        }
    };

    const handleCloseBox = async () => {
        setShow(false);
        clearFields();
    };

    return (
        <div className='sectionRegister'>
            <div className="containerForm">
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
                    show={show}
                    handleClose={handleCloseBox}
                    title={messageBoxTitle}
                    message={message}
                    password={password}
                    personCode={personCode}
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

export default Register;
