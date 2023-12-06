import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexts/useAuth';
import moment from 'moment';
import List from '../../components/List';
import Input from '../../components/Input';
import AlertDialog from '../../components/AlertDialog';
import SuccessDialog from '../../components/SuccessDialog';
import Loading from '../../components/Loading';
import { IoSearch } from 'react-icons/io5';
import { BsPersonFillAdd } from 'react-icons/bs';
import RegisterDonor from '../../components/RegisterDonor';
import FormDonor from '../../components/FormDonor';

import './styles.css';

function DonorList() {
  const { userData } = useAuth();
  const token = userData.token;
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditDonor, setShowEditDonor] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [donorSelected, setDonorSelected] = useState('');
  const donorUrl = import.meta.env.VITE_DONORS;
  const donationUrl = import.meta.env.VITE_DONATIONS;
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [donorToDelete, setDonorToDelete] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [errorSearchTerm, setErrorSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddDonationDialog, setShowAddDonationDialog] = useState(false);
  const [donorToDonate, setDonorToDonate] = useState(null);

  useEffect(() => {

    setLoading(true);

    axios.get(`${donorUrl}?name=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const responseData = Array.isArray(response.data) ? response.data : [response.data];

        const sortedDonors = responseData.toSorted((a, b) => a.name.localeCompare(b.name))

        setDonors(sortedDonors);
        setLoading(false);
        setErrorSearchTerm('');
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setErrorSearchTerm(searchTerm);
        } else {
          console.error('Algo deu errado!', error);
        }
        setLoading(false);
      });
  }, [donorUrl, token, searchTerm]);

  const handleCloseEditDonor = () => {
    setShowEditDonor(false);
    setDonorSelected('');
    setIsEditing(false);
  };
  const handleOpenAddDonation = (donor) => {
    setDonorToDonate(donor);
    setShowAddDonationDialog(true);
  };

  const handleOpenEdit = (donor) => {
    setDonorSelected(donor);
    setIsEditing(true);
    setShowEditDonor(true);
  };

  const handleOpenDelete = (donor) => {
    setDonorToDelete(donor);
    setShowDeleteDialog(true);
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    setAlertMessage('');
    setAlertTitle('');
    setAlertType('');
    setIsEditing(false);
  };

  const updateDonorList = async () => {
    try {
      const response = await axios.get(`${donorUrl}?name=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = Array.isArray(response.data) ? response.data : [response.data];

      const sortedDonors = responseData.toSorted((a, b) => a.name.localeCompare(b.name));

      setDonors(sortedDonors);

    } catch (error) {
      console.error('Error updating employee list:', error);
    }
  };

  const onClickUpdate = async (newName, CPF, birthDate, sex, address, telephone) => {

    if (newName && newName.length < 3) {
      setShowAlertDialog(true);
      setAlertTitle('Atenção');
      setAlertMessage('O nome precisa ter no mínimo 3 caracteres!');
      return;
    }

    if (CPF && CPF.length !== 14) {
      setShowAlertDialog(true);
      setAlertTitle('Atenção');
      setAlertMessage('O CPF precisa ter 11 caracteres!');
      return;
    }

    donorUpdate(newName, CPF, birthDate, sex, address, telephone).catch(error => {
      console.error(error);
    });
  };

  const donorUpdate = async (newName, CPF, birthDate, sex, address, telephone) => {
    const updatedDonor = {};

    if (newName && newName !== donorSelected.name) {
      updatedDonor.name = newName;
    }
    if (CPF && CPF !== donorSelected.CPF) {
      updatedDonor.CPF = CPF;
    }
    if (birthDate && moment(birthDate, 'DD/MM/YYYY').toISOString().split('T')[0] !== moment(donorSelected.birthDate).toISOString().split('T')[0]) {
      const birthDateUS = moment(birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
      updatedDonor.birthDate = birthDateUS;
    }
    if (sex && sex !== donorSelected.sex) {
      updatedDonor.sex = sex;
    }
    if (address && address !== donorSelected.address) {
      updatedDonor.address = address;
    }
    if (telephone && telephone !== donorSelected.telephone) {
      updatedDonor.telephone = telephone;
    }

    // Se nenhum campo foi alterado, exiba uma mensagem de erro
    if (Object.keys(updatedDonor).length === 0) {
      setShowAlertDialog(true);
      setAlertTitle('Atenção');
      setAlertMessage('É necessário alterar algum campo para atualizar!');
      return;
    }

    try {
      const response = await axios.patch(`${donorUrl}${donorSelected._id}`, updatedDonor, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setShowEditDonor(false);
        setAlertType('success');
        setShowSuccessDialog(true);
        setAlertMessage('Doador atualizado com sucesso!');
        setAlertTitle('Sucesso!');

        updateDonorList();
      }
    } catch (error) {
      console.error(error);
    }
    console.log(updatedDonor);
  };

  const deleteDonor = async () => {
    try {
      await axios.delete(`${donorUrl}${donorToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShowDeleteDialog(false);
      setDonorToDelete(null);

      updateDonorList();
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 403) {
        setAlertType('error');
        setAlertMessage('Não é possível excluir um doador administrador!');
        setAlertTitle('Atenção!');
        setShowAlertDialog(true);
        return;
      } else {
        console.error(error);
      }
    }
  };

  const addDonation = async () => {
    try {

      await axios.post(`${donationUrl}${donorToDonate._id}`, null, { // o null é o body da requisição
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShowAddDonationDialog(false);
      setDonorToDonate(null);

      updateDonorList();
    } catch (error) {
      console.error('Erro ao adicionar doação:', error);
      console.log(`${donationUrl}${donorToDonate._id}`);
    }
  };

  return (
    <div className='ContainerDonor'>
      <h1 className='ContainerDonorTitle'>Doadores</h1>
      {donors && donors.length === 0 ? (
        <p>nenhum doador encontrado</p>
      ) : (
        <>

          <div className='ContainerHeadSearchDonor'>
            <div className='SearchInput'>
              <IoSearch className='SearchIcon' />
              <Input
                placeholder={'Pesquise pelo nome do doador'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='InputSearchDonor'
              />
            </div>

            <div>
              <button onClick={() => setShowRegister(true)} className='AddButton'>
                <BsPersonFillAdd className='AddIcon' /> Adicionar
              </button>
            </div>
          </div>

          {showRegister && <RegisterDonor onClose={() => setShowRegister(false)} updateDonorList={updateDonorList} />}

          {errorSearchTerm && searchTerm !== '' ? (
            <p>O texto &quot;{searchTerm}&quot; não corresponde a nenhum doador!</p>
          ) : (
            <>
              {loading ? (
                <Loading />
              ) : (
                <List
                  users={donors}
                  onClick={(donor) => handleOpenEdit(donor)}
                  onDelete={(donor) => handleOpenDelete(donor)}
                  onAddDonation={(donor) => handleOpenAddDonation(donor)}
                />
              )}
            </>
          )}
          {isEditing && (
            <FormDonor
              type={'donor'}
              show={showEditDonor}
              handleClose={handleCloseEditDonor}
              donorData={donorSelected}
              onClick={(newName, CPF, birthDate, sex, address, telephone) => {
                onClickUpdate(newName, CPF, birthDate, sex, address, telephone);
              }}
            />
          )}
        </>
      )}


      <AlertDialog
        show={showAlertDialog}
        handleClose={() => setShowAlertDialog(false)}
        title={alertTitle}
        message={alertMessage}
      />

      <AlertDialog
        show={showDeleteDialog}
        handleClose={() => setShowDeleteDialog(false)}
        title='Atenção'
        message={`Deseja excluir o doador ${donorToDelete?.name}?`}
        onConfirm={deleteDonor}
        showConfirmButtons={true}
      />

      <AlertDialog
        show={showAddDonationDialog}
        handleClose={() => setShowAddDonationDialog(false)}
        title='Atenção'
        message={`Deseja adicionar uma doação para ${donorToDonate?.name}?`}
        onConfirm={addDonation}
        showConfirmButtons={true}
      />

      <SuccessDialog
        handleClose={handleCloseSuccessDialog}
        show={showSuccessDialog}
        message={alertMessage}
        title={alertTitle}
        type={alertType}
      />
    </div>
  );
}

export default DonorList;
