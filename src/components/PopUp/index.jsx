import PropTypes from 'prop-types';
import './styles.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexts/useAuth';


function Popup({ show, onClose, employee }) {
    const [senha, setSenha] = useState('')
    const { userData } = useAuth();
    const token = userData.token
    const employeeUrl = import.meta.env.VITE_EMPLOYEES;

    useEffect(() => {
        if (employee && employee.password) {
            setSenha(employee.password);
        }
    }, [employee]);

    if (!show) {
        return null;
    }

    async function editar() {
        const updatedEmployee = {
            password: senha
        };

        try {
            const response = await axios.patch(`${employeeUrl}${employee.employeeCode}`, updatedEmployee, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
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
            
           <button onClick={editar}>Salvar edição</button>
            


        </div>
    );
}

Popup.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    employee: PropTypes.object
};

export default Popup;
