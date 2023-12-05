import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Button from '../Button';
import { IoCloseCircleSharp } from 'react-icons/io5';
import './styles.css';

function FormDonor({ show, handleClose, donorData, onClick }) {
    const [CPF, setCPF] = useState(donorData.CPF || '');
    const [name, setName] = useState(donorData.name || '');
    const [birthDate, setBirthDate] = useState(donorData.birthDate || '');
    const [sex, setSex] = useState(donorData.sex || '');
    const [address, setAddress] = useState(donorData.address || '');
    const [telephone, setTelephone] = useState(donorData.telephone || '');
    const [nameError, setNameError] = useState('');
    const [CPFError, setCPFError] = useState('');

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
        const newSex = e.target.value.toUpperCase();
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
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d{2})(\d)/, "($1) $2");
        value = value.replace(/(\d{5})(\d)/, "$1-$2");
        setTelephone(value);
    };

    const clearFields = () => {
        setName('');
        setCPF('');
        setBirthDate('');
        setSex('');
        setAddress('');
        setTelephone('');
        setNameError('');
        setCPFError('');
    };

    useEffect(() => {
        if (donorData.name) {
            setName(donorData.name);
        }
        // Add similar blocks for other fields if needed
    }, [donorData]);

    useEffect(() => {
        if (!show) {
            clearFields();
        }
    }, [show]);

    const handleCloseBox = async () => {
        handleClose();
        clearFields();
    };

    return (
        <div className="ContainerEditDonor">
            <div className="ContainerEditDonorBody">
                <h1>Editar Dados do Doador</h1>
                <IoCloseCircleSharp className="IconCloseEditDonor" onClick={handleCloseBox} />
                <div className="ContainerFormDonor">
                    <h3>Código do Doador: <span>{donorData.donorCode}</span></h3>
                    <div className="labelEditDonor">
                        <label htmlFor="name">Nome:</label>
                        <Input
                            id="name"
                            placeholder={'Digite um novo nome'}
                            type={'text'}
                            value={name}
                            onChange={(e) => handleName(e)}
                        />
                    </div>
                    {nameError && <p className="textError">{nameError}</p>}
                    <div className="labelEditDonor">
                        <label htmlFor="CPF">CPF:</label>
                        <Input
                            id="CPF"
                            placeholder={'999.999.999-99'}
                            type={'text'}
                            value={CPF}
                            onChange={(e) => handleCPF(e)}
                        />
                    </div>
                    {CPFError && <p className="textError">{CPFError}</p>}
                    <div className="labelEditDonor">
                        <label htmlFor="birthDate">Data de Nascimento:</label>
                        <Input
                            id="birthDate"
                            placeholder={'DD/MM/AAAA'}
                            type={'text'}
                            value={birthDate}
                            onChange={(e) => handleBirthDate(e)}
                        />
                    </div>
                    <div className="labelEditDonor">
                        <label htmlFor="sex">Sexo:</label>
                        <Input
                            id="sex"
                            placeholder={'M ou F'}
                            type={'text'}
                            value={sex}
                            onChange={(e) => handleSex(e)}
                        />
                    </div>
                    <div className="labelEditDonor">
                        <label htmlFor="address">Endereço:</label>
                        <Input
                            id="address"
                            placeholder={'Digite o endereço do doador'}
                            type={'text'}
                            value={address}
                            onChange={(e) => handleAddress(e)}
                        />
                    </div>
                    <div className="labelEditDonor">
                        <label htmlFor="telephone">Telefone:</label>
                        <Input
                            id="telephone"
                            placeholder={'(99)99999-9999'}
                            type={'text'}
                            value={telephone}
                            onChange={(e) => handlePhone(e)}
                        />
                    </div>
                    <Button
                        onClick={() => {
                            onClick(name, CPF, birthDate, sex, address, telephone);
                        }}
                        TextButton={'Atualizar'}
                    />
                </div>
            </div>
        </div>
    );
}


FormDonor.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    donorData: PropTypes.shape({
        name: PropTypes.string,
        donorCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        CPF: PropTypes.string,
        birthDate: PropTypes.string,
        sex: PropTypes.string,
        address: PropTypes.string,
        telephone: PropTypes.string,
    }),
    onClick: PropTypes.func.isRequired,
};


export default FormDonor;
