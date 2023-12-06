import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Input from '../Input';
import Button from '../Button';
import { IoCloseCircleSharp } from 'react-icons/io5';
import './styles.css';

function FormDonor({ show, handleClose, donorData, onClick }) {
    const [name, setName] = useState(donorData.name || '');
    const [CPF, setCPF] = useState(donorData.CPF || '');
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
        if (donorData.birthDate) {
            const birthDateBR = moment(donorData.birthDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
            setBirthDate(birthDateBR);
        }
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
            <div className="ContainerFormEditDonor">
                <h1>Editar Dados do Doador</h1>
                <IoCloseCircleSharp className="IconCloseEditDonor" onClick={handleCloseBox} />
                <div className="ContainerInputDonor">
                    <h3>Id do Doador: <span>{donorData._id}</span></h3>
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
                    <div className="FlexContainer">
                        <div className="LabelDonor">
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
                    onClick={() => {
                        onClick(name, CPF, birthDate, sex, address, telephone);
                    }}
                    TextButton={'Atualizar'}
                    className="ButtonEditDonor"
                />
            </div>
        </div >
    );
}


FormDonor.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    donorData: PropTypes.shape({
        _id: PropTypes.string,
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
