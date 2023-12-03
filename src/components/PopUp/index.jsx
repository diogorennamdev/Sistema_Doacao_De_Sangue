import { Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Button from '../Button';
import Input from '../Input';
import PropTypes from 'prop-types';
import { IoMdClose } from "react-icons/io";
import './styles.css';

function PopUp({ show, handleClose, userData, type, onClick }) {
    const [password, setPassword] = useState('')
    const [newName, setNewName] = useState(userData.name || '');
    

    function clearFields() {
        setPassword('')
    }

    useEffect(() => {
        if (userData.name) {
            setNewName(userData.name);
        }
      }, [userData]);
      

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
                        <div className="ContainerFormEditeEmployee">
                            <h3>Código:{userData.employeeCode}</h3>
                            <div className='label'>
                                <label htmlFor="name">Nome:</label>
                                <Input
                                    id='name'
                                    placeholder={'Digite um novo nome'}
                                    type={'text'}
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                            </div>
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
                                    onClick(newName, password);
                                }}
                                TextButton={'Atualizar'}
                            />
                        </div>
                    ) : (
                        // código para edição dos doadores
                        <div className='ContainerFormEditeDonation'>

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
    userData: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default PopUp;
