import { Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Button from '../Button';
import Input from '../Input';
import PropTypes from 'prop-types';
import { IoMdClose } from "react-icons/io";
import './styles.css';

function PopUp({ show, handleClose, userData, type, onClick }) {
    const [password, setPassword] = useState('')

    function clearFields() {
        setPassword('')
    }
  
    useEffect(() => {
        if (!show) {
            clearFields();// Define onSuccess como false quando o modal é fechado
        }
    }, [show]);
    return (
        <Modal className='ModalEditUser' show={show} onHide={() => {
            handleClose();
            clearFields();
        }} backdrop="static">

            <Modal.Body className='BodyPopUp'>
                <div className='ContainerBody'>
                    <IoMdClose className='IconClosePopUp' onClick={() => {
                        handleClose();
                        clearFields();
                    }} />
                    <h2>Funcionário: {userData.name}</h2>
                    {type === 'employee' ? (
                        <div className="ContainerFormEditerEmployee">
                            <h3>Código:{userData.employeeCode}</h3>
                            <div className='label'>
                                <label htmlFor="password">Nova senha:</label>
                                <Input
                                    id='password'
                                    placeholder={'Digite uma nova senha'}
                                    type={'text'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button
                              onClick={() => {
                                onClick(password);
                            }}
                                TextButton={'Atualizar'}
                            />
                        </div>
                    ) : (
                        // código para edição dos doadores
                        <div className='ContainerFormEditerDonation'>

                        </div>
                    )}


                </div>
            </Modal.Body>
        </Modal>
    );
}

PopUp.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    userData: PropTypes.string.isRequired,// Supondo que userData seja um objeto
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired, // Se onClick é usado para atualizar a senha
};


export default PopUp;
