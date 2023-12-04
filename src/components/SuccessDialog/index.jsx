import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Button from '../Button';
import { IoCheckmarkCircle, IoCopyOutline } from "react-icons/io5";
import PropTypes from 'prop-types';

import './styles.css'; // Importando o arquivo CSS

function SuccessDialog({ show, handleClose, title, message, password, personCode, createType, passwordType }) {
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
        <Modal show={show} onHide={handleClose} className={`my-modal success`} backdrop="static">
            <Modal.Header closeButton className='success-header'>
                <Modal.Title><IoCheckmarkCircle className='icon-success' />{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
                {createType && (
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

                {passwordType && (
                    <div className='informationEmployee'>
                        <p>
                            <span>Nova senha:</span>  {password}
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

SuccessDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
    personCode: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),    password: PropTypes.string,
    createType: PropTypes.bool, // Adicionando prop para o tipo de criação
    passwordType: PropTypes.bool, // Adicionando prop para o tipo de senha
};

export default SuccessDialog;
