import { useState, useEffect } from 'react';
import { useAuth } from '../../Contexts/useAuth';
import axios from 'axios';

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

    // Transforma o objeto counts em um array de arrays, cada um com dois elementos: tipo sanguíneo e contagem
    const countsArray = Object.entries(counts);

    // Calcula o total de bolsas no estoque
    const totalBags = countsArray.reduce((total, [, count]) => total + count, 0);

    // Calcula a porcentagem de bolsas para cada tipo sanguíneo
    const countsWithPercentage = countsArray.map(([bloodType, count]) => {
        const cleanedBloodType = bloodType.replace(' (Pos)', '').replace(' (Neg)', '');// Remove o Pos e Neg do tipo sanguíneo
        let percentage = 0;
        if (totalBags !== 0) {
            percentage = ((count / totalBags) * 100).toFixed(2);
        }
        return [bloodType, count, cleanedBloodType, percentage];// Retorna um array com o tipo sanguíneo original, a contagem, o tipo sanguíneo limpo e a porcentagem
    });
    
    return (
        <div>
            {countsWithPercentage.map(([, , cleanedBloodType, percentage]) => (
                <p key={cleanedBloodType}>{cleanedBloodType}: {percentage}%</p> // Usa o tipo sanguíneo limpo para a porcentagem
            ))}
            <h1>Estoque de Bolsas de Sangue</h1>
            <table>
                <thead>
                    <tr>
                        {countsWithPercentage.map(([bloodType]) => (
                            <th key={bloodType}>{bloodType}</th> // Usa o tipo sanguíneo original para a tabela
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {countsWithPercentage.map(([bloodType, count]) => (
                            <td key={bloodType}>{count}</td> // Usa o tipo sanguíneo original para a tabela
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );

}

export default Stock;
