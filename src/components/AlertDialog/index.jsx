import { Modal } from 'react-bootstrap';
import Button from '../Button';
import { IoAlertCircle } from "react-icons/io5";
import PropTypes from 'prop-types';

import './styles.css'; // Importando o arquivo CSS

function AlertDialog({ show, handleClose, title, message, onConfirm, showConfirmButtons }) {
    return (
        <Modal show={show} onHide={handleClose} className="my-modal" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title ><IoAlertCircle  className='icon-alert'/>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                {showConfirmButtons ? (
                    <>
                        <Button variant="secondary" onClick={handleClose} TextButton={'Não'} className="nao" />
                        <Button variant="primary" onClick={onConfirm} TextButton={'Sim'}  className="sim"/>
                    </>
                ) : (
                    <Button variant="primary" onClick={handleClose} TextButton={'Fechar'} />
                )}
            </Modal.Footer>
        </Modal>
    );
}

AlertDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func,
    showConfirmButtons: PropTypes.bool,
};

export default AlertDialog;
