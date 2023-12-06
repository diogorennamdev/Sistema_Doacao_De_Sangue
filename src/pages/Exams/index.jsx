import { useEffect, useState } from 'react';
import { useAuth } from '../../Contexts/useAuth';
import axios from 'axios';
import List from '../../components/List';
import Input from '../../components/Input';
import './styles.css';
function Exams() {
    const [exams, setExams] = useState([]);
    const { userData } = useAuth();
    const ApiUrl = import.meta.env.VITE_DONATIONS;

    useEffect(() => {
        const returnExams = async () => {
            try {
                const response = await axios.get(`${ApiUrl}`, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                    },
                })
                // Mapeia os dados recebidos e transforma para a estrutura esperada
                const formattedExams = response.data.map(({ donorId, donorName, donations }) => ({
                    _id: donorId,
                    name: donorName,
                    donations: donations.length > 0 ? [donations.sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate))[0]] : [],
                    
                }));

                setExams(formattedExams);

            } catch (error) {
                console.log(error)
            }
        }
        returnExams()
    }, [])
    return (
        <div className='ContainerExams'>
            <div>
                <Input 
                placeholder={'Pesquise pelo nome ou data da doação'}
                />
            </div>
            {exams && (
                <List

                    users={exams} // Passa cada usuário como um array para o componente Lis
                />
            )}
        </div>
    )
}

export default Exams