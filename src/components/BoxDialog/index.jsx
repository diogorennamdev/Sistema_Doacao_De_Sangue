import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './styles.css'; // Importando o arquivo CSS

function BoxDialog({ show, handleClose, title, message }) {
    return (
        <Modal show={show} onHide={handleClose} className="my-modal">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

BoxDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default BoxDialog;
