import { useState } from 'react';
import { useAuth } from '../../Contexts/useAuth';
import axios from 'axios';
import PropTypes from 'prop-types';
import Input from '../Input';
import Button from '../Button';
import moment from 'moment';
import { IoCloseCircleSharp } from 'react-icons/io5';
import AlertDialog from '../AlertDialog';
import SuccessDialog from '../SuccessDialog';

import './styles.css';

function RegisterDonor({ onClose }) {
    const donorUrl = import.meta.env.VITE_DONORS;
    const { userData } = useAuth();
    const token = userData.token;

    const [CPF, setCPF] = useState('');
    const [CPFError, setCPFError] = useState('');
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [sex, setSex] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [nameError, setNameError] = useState('');
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [type, setType] = useState('');
    const [messageBoxTitle, setMessageBoxTitle] = useState('');


    const handleName = (e) => {
        const newName = e.target.value;
        setName(newName);
        if (newName.length >= 3) {
            setNameError('');
        } else {
            setNameError('O nome precisa ter no mínimo 3 caracteres.');
        }
    };

    const handleCPF = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        setCPF(value);
        if (value.length === 14) {
            setCPFError('');
        } else {
            setCPFError('O CPF precisa ter 11 caracteres.');
        }
    };

    const handleBirthDate = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d{2})(\d)/, "$1/$2");
        value = value.replace(/(\d{2})(\d)/, "$1/$2");
        setBirthDate(value);
    };

    const handleSex = (e) => {
        const newSex = e.target.value.toUpperCase(); // Converte para maiúsculas
        // Se o usuário apagar o conteúdo, permita a atualização do estado para uma string vazia
        if (newSex === '' || newSex === 'M' || newSex === 'F') {
            setSex(newSex);
        }
    };

    const handleAddress = (e) => {
        const newAddress = e.target.value;
        setAddress(newAddress);
    };

    const handlePhone = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, ""); // remove qualquer caractere que não seja número
        value = value.replace(/(\d{2})(\d)/, "($1) $2"); // insere um parêntese em volta dos dois primeiros dígitos
        value = value.replace(/(\d{5})(\d)/, "$1-$2"); // insere um hífen entre o quinto e o sexto dígitos
        setTelephone(value);
    };

    const clearFields = () => {
        setName('');
        setCPF('');
        setBirthDate('');
        setSex('');
        setAddress('');
        setTelephone('');
    };

    const validateFields = () => {
        if (!name || !CPF || !birthDate || !sex || !address || !telephone) {
            setShow(true);
            setLoading(false);
            setMessageBoxTitle('Atenção');
            setMessage('Preencha todos os campos!');
            setType('alert');
            return false;
        }
    
        if (name.length < 3) {
            setShow(true);
            setLoading(false);
            setMessageBoxTitle('Atenção');
            setMessage('O nome precisa ter no mínimo 3 caracteres!');
            setType('alert');
            return false;
        }
    
        if (CPF.length < 14) {
            setShow(true);
            setLoading(false);
            setMessageBoxTitle('Atenção');
            setMessage('O CPF precisa ter 11 caracteres!');
            setType('alert');
            return false;
        }
    
        return true;
    };
    
    const handleSubmit = async () => {
        try {
            setLoading(true);
    
            if (!validateFields()) {
                return;
            }
    
            const birthDateUS = moment(birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    
            const newDonor = {
                name,
                CPF,
                birthDate: birthDateUS,
                sex,
                address,
                telephone,
            };
    
            const response = await axios.post(
                `${donorUrl}`,
                newDonor, // Envia os dados do novo doador
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                setMessageBoxTitle('Sucesso');
                setMessage('Doador cadastrado com sucesso!');
                setShow(true);
                setShowSuccessDialog(true);
                setType('success');
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
            setType('alert');
            if (error.response) {
                setMessageBoxTitle('Erro');
                if (error.response.status === 400 || error.response.status === 500) {
                    const errorMessage = error.response.data.error || 'Ocorreu um erro desconhecido.'; // Extrai a mensagem de erro ou fornece uma mensagem padrão
                    setMessage(errorMessage); // Define a mensagem para a mensagem de erro extraída
                } else {
                    setMessage('Erro desconhecido ao fazer a requisição. Tente novamente mais tarde.');
                }
            } else {
                setMessageBoxTitle('Erro de conexão');
                setMessage('Houve um problema de conexão. Por favor, verifique sua conexão com a internet.');
            }            
        }
    };
    

    const handleCloseBox = async () => {
        setShowSuccessDialog(false);
        setShow(false);
        if (type === 'success') {
            clearFields();
            onClose();
        }
    };


    return (
        <div className='SectionRegisterDonor'>
            <div className="ContainerFormDonor">
                <IoCloseCircleSharp onClick={onClose} className='closeIcon' />
                <h1>Cadastrar Doador</h1>
                <div className="ContainerInputDonor">
                    <div className="LabelDonor">
                        <label htmlFor="name" className='labelStyleDonor'>Nome:</label>
                        <Input
                            id="name"
                            type={'text'}
                            placeholder={'Digite o nome do doador'}
                            value={name}
                            onChange={handleName}
                            className="customInput"
                            maxLength={255}
                        />
                    </div>
                    {nameError && <p className="textError">{nameError}</p>}
                    <div className="LabelDonor">
                        <label htmlFor="CPF" className='labelStyleDonor'>CPF:</label>
                        <Input
                            id="CPF"
                            type={'text'}
                            placeholder={'999.999.999-99'}
                            maxLength={14}
                            value={CPF}
                            onChange={handleCPF}
                            className="customInput"
                        />
                    </div>
                    {CPFError && <p className="textError">{CPFError}</p>}
                    <div className="LabelDonor">
                        <div className="FlexContainer">
                            <label htmlFor="birthDate" className='labelStyleDonorFlex'>Data de Nascimento:</label>
                            <Input
                                id="birthDate"
                                type={'text'}
                                placeholder={'DD/MM/AAAA'}
                                maxLength={10}
                                value={birthDate}
                                onChange={handleBirthDate}
                                className="customInputBD"
                            />
                            <div className="LabelDonor">
                                <label htmlFor="sex" className='labelStyleDonorFlex'>Sexo:</label>
                                <Input
                                    id="sex"
                                    type={'string'}
                                    placeholder={'M ou F'}
                                    value={sex}
                                    onChange={handleSex}
                                    className="customInputSX"
                                    maxLength={1} // Limitar o comprimento para 1 caractere
                                />
                            </div>
                        </div>
                    </div>
                    <div className="LabelDonor">
                        <label htmlFor="address" className='labelStyleDonor'>Endereço:</label>
                        <Input
                            id="address"
                            type={'text'}
                            placeholder={'Digite o endereço do doador'}
                            value={address}
                            onChange={handleAddress}
                            className="customInput"
                        />
                    </div>
                    <div className="LabelDonor">
                        <label htmlFor="telephone" className='labelStyleDonor'>Telefone:</label>
                        <Input
                            id="telephone"
                            type={'text'}
                            placeholder={'(99)99999-9999'}
                            maxLength={15}
                            value={telephone}
                            onChange={handlePhone}
                            className="customInput"
                        />
                    </div>
                </div>
                <Button
                    TextButton={'Criar Doador'}
                    onClick={handleSubmit}
                    loading={loading}
                />
                {showSuccessDialog && type === 'success' && (
                    <SuccessDialog
                        show={showSuccessDialog}
                        handleClose={handleCloseBox}
                        title={messageBoxTitle}
                        message={message}
                    />
                )}
                {show && type === 'alert' && (
                    <AlertDialog
                        show={show}
                        handleClose={handleCloseBox}
                        title={messageBoxTitle}
                        message={message}
                    />
                )}
            </div>
        </div>
    );
}

RegisterDonor.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default RegisterDonor;