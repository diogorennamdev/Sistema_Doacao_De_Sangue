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

    function limparCampos() {
        setIsAdmin(false);
        setNome('');
        setSenha('');
        setSenhaValida(true);
    }
    const handleSubmit = async () => {
        if (nome === '' || senha === '') {
            setmensagem('Preencha todos os campos!');
            setShow(true);
            return;
        }

        if (senha.length < 8) {
            setmensagem('Sua senha deve ter no mínimo 8 caracteres.');
            setShow(true);
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
                limparCampos()
            }
            

        } catch (error) {
            setmensagem(error.response.data.error);
            setShow(true);
            setLoading(false);
        }
    };

    const handleCloseBox = async () => {
        setShow(false);
        setmensagem('')
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
                    TextButton={'Criar Funcionário'}
                    onclick={handleSubmit}
                    loading={loading}

                />
            </div>
            <BoxDialog
                title='Atenção!'
                message={mensagem}
                show={show}
                handleClose={handleCloseBox}
            />
        </div>
    );
}

export default Cadastro;
