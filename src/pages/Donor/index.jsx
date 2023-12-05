import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexts/useAuth';
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
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [CPF, setCPF] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [sex, setSex] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [donorToDelete, setDonorToDelete] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [errorSearchTerm, setErrorSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios.get(`${donorUrl}?name=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const responseData = Array.isArray(response.data) ? response.data : [response.data];

        const sortedDonors = responseData.sort((a, b) => a.name.localeCompare(b.name));

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
    setCPF('');
    setName('');
    setBirthDate('');
    setSex('');
    setAddress('');
    setTelephone('');
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

      const sortedDonors = responseData.sort((a, b) => a.name.localeCompare(b.name));

      setDonors(sortedDonors);

    } catch (error) {
      console.error('Error updating donor list:', error);
    }
  };

  const onClickUpdate = (newName) => {
    if (newName === donorSelected.name) {
      setShowAlertDialog(true);
      setAlertTitle('Atenção');
      setAlertMessage('É necessário alterar o nome para atualizar!');
      return;
    }

    if (newName && newName.length < 3) {
      setShowAlertDialog(true);
      setAlertTitle('Atenção');
      setAlertMessage('O nome precisa ter no mínimo 3 caracteres!');
      return;
    }

    donorUpdate(newName).catch(error => {
      console.error(error);
    });
  };

  const donorUpdate = async (newName) => {
    const updatedDonor = {};
    if (newName) {
      updatedDonor.name = newName;
    }

    try {
      const response = await axios.patch(`${donorUrl}${donorSelected.donorCode}`, updatedDonor, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setShowEditDonor(false);
        setAlertType('success');
        setShowSuccessDialog(true);
        setAlertMessage('Nome atualizado com sucesso!');
        setAlertTitle('Sucesso!');

        updateDonorList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDonor = async () => {
    try {
      await axios.delete(`${donorUrl}${donorToDelete.donorCode}`, {
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

  return (
    <div className='ContainerDonor'>
      <h1 className='ContainerDonorTitle'>Doadores</h1>
      <div className='ContainerHeadSearch'>
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
            />
          )}
        </>
      )}
      {isEditing && (
        <FormDonor
          show={showEditDonor}
          handleClose={handleCloseEditDonor}
          donorData={donorSelected}
          onClick={(newName) => {
            onClickUpdate(newName);
          }}
        />
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
