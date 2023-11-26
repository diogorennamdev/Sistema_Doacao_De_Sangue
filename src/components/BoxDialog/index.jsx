import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import Button from '../Button';
import { IoAlertCircle, IoCheckmarkCircle, IoCopyOutline } from "react-icons/io5"; // Importe o ícone de sucesso IoCheckmarkCircle
import PropTypes from 'prop-types';

import './styles.css'; // Importando o arquivo CSS

function BoxDialog({ show, handleClose, title, message, type, password, personCode }) {
    const isSuccess = type === 'success'; // Adicione um tipo para determinar se é uma mensagem de sucesso
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000); // Esconder a mensagem após 2 segundos
            })
            .catch((err) => {
                console.error('Erro ao copiar o texto para a área de transferência:', err);
            });
    };

    return (
        <Modal show={show} onHide={handleClose} className={`my-modal ${isSuccess ? 'success' : ''}`} backdrop="static">
            <Modal.Header closeButton className={isSuccess ? 'success-header' : ''}>
                <Modal.Title><span className={isSuccess ? 'icon-success' : 'icon-alert'}>
                    {isSuccess ? <IoCheckmarkCircle /> : <IoAlertCircle />}</span>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
                {isSuccess && (
                    <div className='informationEmployee'>
                        <p>
                            <span>Código:</span>
                            {personCode}
                            <IoCopyOutline onClick={() => copyToClipboard(personCode)} className="copy-icon" />
                        </p>
                        <p>
                            <span>Senha:</span>  {password}
                            <IoCopyOutline onClick={() => copyToClipboard(password)} className="copy-icon" />
                        </p>
                        {isCopied && (
                            <div className="copy-success-message">Texto copiado com sucesso!</div>
                        )}
                    </div>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={handleClose} TextButton={'Fechar'} />
            </Modal.Footer>
        </Modal>
    );
}

BoxDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string,
    personCode: PropTypes.string, // Adicionando prop para o código da pessoa
    password: PropTypes.string,
};

export default BoxDialog;
