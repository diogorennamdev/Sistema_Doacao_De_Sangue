import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import PropTypes from 'prop-types';
import { IoMdClose } from "react-icons/io";
import './styles.css'; // Importando o arquivo CSS

function PopUp({ show, handleClose, userData }) {
    console.log(userData);
    return (
        <Modal className='ModalEditUser' show={show} onHide={handleClose} backdrop="static">

            <Modal.Body className='BodyPopUp'>
                <div className='ContainerBody'>
                    <IoMdClose className='IconClosePopUp' onClick={handleClose} />

                    <div className="ContainerFormEditer">
                        <h2>Edite as informações de: {userData.name}</h2>
                        <p>{userData.name}</p>
                       
                    </div>

                </div>


            </Modal.Body>
        </Modal>
    );
}

PopUp.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string,
    personCode: PropTypes.string, // Adicionando prop para o código da pessoa
    password: PropTypes.string,
};

export default PopUp;
