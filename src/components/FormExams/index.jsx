import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './styles.css';
import Button from '../Button';
function FormExams({ isOpen, onClose, donor, onConfirmAddDonation,loading }) {
    const [formData, setFormData] = useState({
        bloodType: '',
        exams: [
            "Sífilis",
            "Chagas",
            "Hepatite B e C",
            "HIV",
            "HTLV I/II"
        ],
        examsResult: 'negativo',
    });
    //console.log(donor)
    const [showBloodTypeError, setShowBloodTypeError] = useState(false);

    const examsList = [
        "Sífilis",
        "Chagas",
        "Hepatite B e C",
        "HIV",
        "HTLV I/II"
    ];

    const bloodTypes = [
        "A +(Pos)",
        "A -(Neg)",
        "B +(Pos)",
        "B -(Neg)",
        "AB +(Pos)",
        "AB -(Neg)",
        "O +(Pos)",
        "O -(Neg)",
    ];

    const handleBloodTypeChange = (e) => {
        setFormData({
            ...formData,
            bloodType: e.target.value,
        });
    };

    const handleExamResultChange = (result) => {
        setFormData({
            ...formData,
            examsResult: result,
        });
    };

    const handleAddDonation = () => {
        if (formData.bloodType !== '') {
            setShowBloodTypeError(false);
            onConfirmAddDonation(formData);
        } else {
            setShowBloodTypeError(true);
            setTimeout(() => {
                setShowBloodTypeError(false); // Ocultar a mensagem após 3 segundos
            }, 3000);
        }
    };
    const formatDate = (dateString) => {
        const date = dateString ? new Date(dateString) : null;
        if (date) {
            const day = date.getDate();
            const month = date.getMonth() + 1; // Os meses começam do zero, então somamos 1
            const year = date.getFullYear();
        
            return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
        }
        return 'Data não disponível';
    };
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content-Exams">
                <div className="modal-FormExams-header">
                    <h2>Informações da doação:</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <div className='modal-header-title'>
                    <h4>Doador: {donor.name}</h4>
                   <h4>Data da doação: {formatDate(donor?.donations?.[0]?.donationDate)}</h4>
                </div>
                <div className="modal-body">
                    <label htmlFor="bloodType">Tipo Sanguíneo:</label>
                    <select id="bloodType" onChange={handleBloodTypeChange}>
                        <option value="">Selecione o tipo sanguíneo</option>
                        {bloodTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    {showBloodTypeError && (
                        <p style={{ color: 'red', fontWeight:600, marginTop:0.3 }}>Por favor, selecione um tipo sanguíneo!</p>
                    )}

                    <div className='ListExams'>
                        <h3>Exames:</h3>
                        {examsList.map((exam) => (
                            <div key={exam}>
                                <p>{exam}</p>
                            </div>
                        ))}

                        <div className='ResultExams'>
                            <h4>Resultado dos exames:</h4>
                            <label>
                                <input
                                    type="radio"
                                    name="examResult"
                                    value="positivo"
                                    checked={formData.examsResult === 'positivo'}
                                    onChange={() => handleExamResultChange('positivo')}
                                />
                                Positivo
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="examResult"
                                    value="negativo"
                                    checked={formData.examsResult === 'negativo'}
                                    onChange={() => handleExamResultChange('negativo')}
                                />
                                Negativo
                            </label>
                        </div>
                    </div>
                </div>

                <Button onClick={handleAddDonation} TextButton={'Salvar exame'} loading={loading} />
            </div>
        </div>
    );
}

export default FormExams;
