import { useState, useEffect } from 'react';
import { useAuth } from '../../Contexts/useAuth';
import axios from 'axios';
import adequado from '../../images/adequado.svg';
import alerta from '../../images/alerta.svg';
import critico from '../../images/critico.svg';
import estavel from '../../images/estavel.svg';

import './styles.css';

const Stock = () => {
    const stock = import.meta.env.VITE_STOCK

    const [counts, setCounts] = useState({});
    const { userData } = useAuth();

    useEffect(() => {
        const fetchCounts = async () => {
            const response = await axios.get(`${stock}`, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            });
            setCounts(response.data);
            console.log(response.data);
        }
        fetchCounts();
    }, [stock, userData]);

    const countsArray = Object.entries(counts);
    const totalBags = countsArray.reduce((total, [, count]) => total + count, 0);

    const countsWithPercentage = countsArray.map(([bloodType, count]) => {
        const cleanedBloodType = bloodType.replace(' (Pos)', '').replace(' (Neg)', '');
        let percentage = 0;
        if (totalBags !== 0) {
            percentage = Math.floor((count / totalBags) * 100); // Alterado aqui
        }
        return [bloodType, count, cleanedBloodType, percentage];
    });

    return (
        <div className='ContainerBloodBag'>
            <h1>Estoque de Bolsas de Sangue</h1>
            <div className="icon-grid">
                {countsWithPercentage.map(([, , cleanedBloodType, percentage]) => {
                    let iconSrc, altText;
                    if (percentage < 10) {
                        iconSrc = critico;
                        altText = "Critico";
                    } else if (percentage < 20) {
                        iconSrc = alerta;
                        altText = "Alerta";
                    } else if (percentage < 60) {
                        iconSrc = adequado;
                        altText = "Adequado";
                    } else {
                        iconSrc = estavel;
                        altText = "Estavel";
                    }

                    return (
                        <div key={cleanedBloodType} className="icon-container">
                            <img src={iconSrc} alt={altText} />
                            <p>{altText}</p>
                            <p className="icon-text">{cleanedBloodType}</p>
                        </div>
                    );
                })}
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Grupo ABO | Rh (Pos) ou (Neg)</th>
                        <th>Quantidade de bolsas no estoque</th>
                        <th>Porcentagem %</th>
                    </tr>
                </thead>
                <tbody>
                    {countsWithPercentage.map(([, count, cleanedBloodType, percentage]) => (
                        <tr key={cleanedBloodType}>
                            <td>{cleanedBloodType}</td>
                            <td>{count}</td>
                            <td>{Number.isNaN(percentage) ? 'NaN' : percentage}%</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Stock;
