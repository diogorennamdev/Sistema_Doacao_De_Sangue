import { useState, useEffect } from 'react';
import { useAuth } from '../../Contexts/useAuth';
import axios from 'axios';
import Loading from '../../components/Loading';
import adequado from '../../images/adequado.svg';
import alerta from '../../images/alerta.svg';
import critico from '../../images/critico.svg';
import estavel from '../../images/estavel.svg';

import './styles.css';

const Stock = () => {
    const stock = import.meta.env.VITE_STOCK

    const [isLoading, setIsLoading] = useState(true);
    const [counts, setCounts] = useState({});
    const { userData } = useAuth()

    useEffect(() => {
        const fetchCounts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${stock}`, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                    },
                });
                setCounts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Erro:', error);
            }
            setIsLoading(false);
        }
        fetchCounts();
    }, [stock, userData]);

    if (isLoading) {
        return <Loading />;
    }

    const countsArray = Object.entries(counts);
    const totalBags = countsArray.reduce((total, [, count]) => total + count, 0);

    const countsWithPercentage = countsArray.map(([bloodType, count]) => {
        let percentage = 0;
        if (totalBags !== 0) {
            percentage = Math.floor((count / totalBags) * 100);
        }
        return [bloodType, count, percentage];
    });

    return (
        <div className='ContainerStock'>
            <h1 className='Title'>Estoque de Bolsas de Sangue</h1>
            <span className='Subtitle'>Visualize o estoque disponível!</span>
            <div className='ContainerBloodBag'>
                <div className="BloodBagIcon">
                    {countsWithPercentage.map(([bloodType, , percentage]) => {
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
                            <div key={bloodType} className="ContainerIcon no-events">
                                <img src={iconSrc} alt={altText} draggable="false" />
                                <span>{altText}</span>
                                <p className="IconText">{bloodType}</p>
                            </div>
                        );
                    })}
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Grupo ABO | Rh</th>
                            <th>Quantidade de bolsas no estoque</th>
                            <th>Porcentagem %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countsWithPercentage.map(([bloodType, count, percentage]) => (
                            <tr key={bloodType}>
                                <td>{bloodType}</td>
                                <td>{count}</td>
                                <td>{Number.isNaN(percentage) ? 'NaN' : percentage}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Stock;
