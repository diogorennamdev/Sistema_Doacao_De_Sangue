import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexts/useAuth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import BoxDialog from '../../components/BoxDialog';
import './styles.css';

function Cadastro() {
    const { userData } = useAuth();
    const token = userData.token;
    const ApiUrl = import.meta.env.VITE_EMPLOYEES;

    const [isAdmin, setIsAdmin] = useState(false);
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaValida, setSenhaValida] = useState(true);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mensagem, setmensagem] = useState('');
    const [type, setType] = useState('')
    const [titleMensageBox, setTitleMensageBox] = useState('');
    console.log('mensagem', mensagem)
    const [personCode, setPersonCode] = useState('');
    const [password, setPassword] = useState('');
    const handleAdminPermissionChange = (event) => {
        setIsAdmin(event.target.value === 'true');
    };

    const handleSenhaChange = (e) => {
        const newPassword = e.target.value;
        setSenha(newPassword);

        // Validação da senha com no mínimo 8 caracteres
        if (newPassword.length >= 8) {
            setSenhaValida(true);
        } else {
            setSenhaValida(false);
        }
    };

    function clearFields() {
        setIsAdmin(false);
        setNome('');
        setSenha('');
        setSenhaValida(true);
        setPassword('');
        setPersonCode('');
        setTitleMensageBox('');
        setType('');
        setmensagem('');
    }
    const handleSubmit = async () => {

        if (nome === '' || senha === '') {
            setmensagem('Preencha todos os campos!');
            setShow(true);
            setTitleMensageBox('Atenção')
            return;
        }

        if (senha.length < 8) {
            setmensagem('Sua senha deve ter no mínimo 8 caracteres.');
            setShow(true);
            setTitleMensageBox('Atenção')
            return;
        }

        const user = {
            name: nome,
            password: senha,
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
                setmensagem('Funcionário registrado com sucesso!');
                setShow(true);
                setLoading(false);
                setType('success');
                setTitleMensageBox('Sucesso!')
                setPassword(response.data.Funcionário.Senha);
                setPersonCode(response.data.Funcionário.Código)
            }



        } catch (error) {
            if (error.response && error.response.status === 401) {
                setLoading(false);

                console.log('Erro de autenticação: não autorizado.');
                //Fazer um componente para direcionar para a tela de login novamente
                return

            }
            setmensagem(error.response.data.error);
            setShow(true);
            setLoading(false);
            setTitleMensageBox('Atenção!')
        }
    };

    const handleCloseBox = async () => {
        setShow(false);
        clearFields();
    };
    return (
        <div className='sectionCadastre'>
            <div className="containerForm">
                <h1>Preencha as Informações abaixo:</h1>
                <div className="containerInput">
                    <label htmlFor="nome" className='labelStyle'>Nome:</label>
                    <Input
                        id="nome"
                        type={'text'}
                        placeholder={'Digite aqui'}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>

                <div className="containerInput">
                    <label htmlFor="senha" className='labelStyle'>Senha:</label>
                    <Input
                        id='senha'
                        value={senha}
                        type={'password'}
                        placeholder={'Digite aqui'}
                        onChange={handleSenhaChange}
                    />
                </div>

                {!senhaValida && (
                    <p className='textErro'>A senha deve ter no mínimo 8 caracteres.</p>
                )}

                <h3 className='TitleTypeUser'>Usuário terá permissão de Admin?</h3>
                <div className='ContainerSectionRadio'>

                    <div className='cardInputradio'>

                        <input
                            className='custom-radio'
                            type="radio"
                            value={'true'}
                            checked={isAdmin}
                            onChange={handleAdminPermissionChange}
                        />
                        <label>Sim</label>

                    </div>

                    <div className='cardInputradio'
                    >
                        <input
                            type="radio"
                            value={'false'}
                            checked={!isAdmin}
                            onChange={handleAdminPermissionChange}
                        />
                        <label htmlFor=""> Não</label>

                    </div>

                </div>
                <Button
                    TextButton={'Cria Funcionário'}
                    onClick={() => handleSubmit()}
                    loading={loading}

                />
            </div>
            <BoxDialog
                title={titleMensageBox}
                message={mensagem}
                show={show}
                type={type}
                handleClose={handleCloseBox}
                personCode={personCode}
                password={password}
            />
        </div>
    );
}

export default Cadastro;