import { useEffect, useState } from 'react';
import { useAuth } from '../../Contexts/useAuth';
import axios from 'axios';
import List from '../../components/List';
import Input from '../../components/Input';
import { IoSearch } from 'react-icons/io5';
import AlertDialog from '../../components/AlertDialog';
import FormExams from '../../components/FormExams';
import SuccessDialog from '../../components/SuccessDialog';
import Loading from '../../components/Loading';
import './styles.css';

function Exams() {
    const ApiUrl = import.meta.env.VITE_DONATIONS;
    const [exams, setExams] = useState([]);
    const { userData } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [show, setShow] = useState(false);
    const [donorSelected, setDonorSelected] = useState('');
    const [title, setTittle] = useState('');
    const [message, setMessage] = useState('');
    const [showSucessDialog, setShowSucessDialog] = useState(false)
    const [showFormExams, setFormFormExams] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingButton, setLoadingButton] = useState(false);
    useEffect(() => {
        fetchData();
    }, [ApiUrl, userData.token])

    const fetchData = async () => {
        setLoading(true); // Ativar o estado de loading antes da requisição
        try {
            const response = await axios.get(`${ApiUrl}`, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            });

            const formattedExams = response.data.map(({ donorId, donorName, donations }) => ({
                _id: donorId,
                name: donorName,
                donations: donations.length > 0 ? [donations.sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate))[0]] : [],
            }));

            setExams(formattedExams);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Desativar o estado de loading após a requisição, seja bem-sucedida ou não
        }
    };


    const handleClose = () => {
        setShow(false);
    };

    const handleConfirm = async () => {
        try {
            setLoadingButton(true);
            const response = await axios.delete(`${ApiUrl}${donorSelected.donations[0]._id}`, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            });
            if (response.status === 200) {
                setShow(false);
                setShowSucessDialog(true);
                setMessage('Doação Removida com sucesso!');
                setTittle('Sucesso!');
                setLoadingButton(false);

                const updatedExams = exams.filter((exam) => exam._id !== donorSelected._id); // Remove o exame específico da lista
                setExams(updatedExams); // Atualiza o estado com a lista de exames atualizada
            }

        } catch (error) {
            console.error('Erro ao excluir a doação:', error);
            setLoadingButton(false);
        }
    };

    const handleCloseFormExams = async () => {
        setFormFormExams(false)
    };

    const HandleConfirm = async (data) => {
        try {
            setLoadingButton(true);
            const response = await axios.patch(
                `${ApiUrl}${donorSelected.donations[0]._id}`,
                data, // Passando os dados no corpo da requisição
                {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                    },
                }
            );

            if (response.status === 200) {
                console.log('exame adicionado com sucesso');
                setShowSucessDialog(true);
                setMessage('Resultado de exame adicionado com sucesso!');
                setTittle('Sucesso!');
                const updatedExams = exams.filter((exam) => exam._id !== donorSelected._id); // Remove o exame específico da lista
                setExams(updatedExams);
                setLoadingButton(false);

                handleCloseFormExams();
            }

        } catch (error) {
            console.error('Erro ao excluir a doação:', error);
            setLoadingButton(false);

        }
    };

    const [filteredExams, setFilteredExams] = useState([]);

    // Atualize o useEffect para filtrar os exames quando houver uma mudança no searchTerm
    useEffect(() => {
        if (searchTerm.trim() === '') {
            // Se o campo de pesquisa estiver vazio, exibir todos os exames
            setFilteredExams(exams);
        } else {
            // Filtrar os exames com base no nome do doador
            const filtered = exams.filter(exam =>
                exam.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredExams(filtered);
        }
    }, [searchTerm, exams]);

    return (
        <div className='ContainerExams'>
            {loading ? (
                <Loading />
            ) : (
                <>

                    <h1 className='ContainerExamsTitle'>Exames</h1>
                    {exams && exams.length === 0 ? (
                        <p>nehuma doação encontrada</p>
                    ) : (
                        <>
                            <div className='ContainerHeadSearchExams'>
                                <div className='SearchInputExames'>
                                    <IoSearch className='SearchIcon' />
                                    <Input
                                        placeholder={'Pesquise pelo nome do doador'}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className='InputSearchExame'
                                    />
                                </div>
                            </div>
                            {filteredExams.length === 0 ? (
                               <p>Nenhum resultado encontrado para &quot;{searchTerm}&quot;</p>
                            ) : (
                                <>
                                    <List
                                        onClick={() => { }}
                                        onAddDonation={() => { }}
                                        onDelete={
                                            (user) => {
                                                setDonorSelected(user);
                                                setShow(true);
                                                setTittle('Atenção!');
                                                setMessage('Deseja apagar essa doação?')
                                            }
                                        }
                                        onAddExames={
                                            (user) => {
                                                setDonorSelected(user);
                                                setFormFormExams(true);
                                            }
                                        }
                                        users={filteredExams}
                                    />
                                </>

                            )}

                        </>

                    )

                    }
                </>
            )
            }
            <AlertDialog
                show={show}
                handleClose={handleClose}
                title={title}
                message={message}
                onConfirm={handleConfirm}
                showConfirmButtons={true}
            />

            <FormExams
                isOpen={showFormExams}
                onClose={handleCloseFormExams}
                donor={donorSelected}
                loading={loadingButton}
                onConfirmAddDonation={(data) => HandleConfirm(data)}
            />
            <SuccessDialog
                show={showSucessDialog}
                title={title}
                message={message}
                handleClose={() => {
                    setShowSucessDialog(false);
                    setMessage('');
                    setTittle('');
                }}
            />


        </div >
    )
}

export default Exams