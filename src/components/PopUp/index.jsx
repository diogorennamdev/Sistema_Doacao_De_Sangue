import PropTypes from 'prop-types';
import Button from '../Button';
import './styles.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Popup({ show, onClose, employee }) {
    const [senha, setSenha] = useState('')

    useEffect(() => {
        if (employee && employee.password) {
            setSenha(employee.password);
        }
    }, [employee]);

    if (!show) {
        return null;
    }

    async function editar() {
        const url = `https://apidoadoressangue.vercel.app/employees/${employee.employeeCode}`;
        const updatedEmployee = {
            password: senha
        };

        try {
            const response = await axios.put(url, updatedEmployee);
            console.log('Senha atualizada com sucesso!', response.data);
        } catch (error) {
            console.error('Erro ao atualizar a senha', error);
        }
    }

    return (
        <div className="popup">
            <h2>Editando</h2>
            <p>Codigo do funcionario:{employee.employeeCode}</p>
            <label>
                Senha:
                <input type="password" onChange={(e) => setSenha(e.target.value)} value={senha} />
            </label>
            <button onClick={onClose}>Fechar Popup</button>
            <Button 
            TextButton={'Salvar edição'}
            onClick={editar}   
            />           
        </div>
    );
}

Popup.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    employee: PropTypes.object
};

export default Popup;
