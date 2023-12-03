import React, { useState, useEffect } from 'react'
import Input from '../../components/Input';
import { FaSearch } from "react-icons/fa";
import { useAuth } from '../../Contexts/useAuth';
import axios from 'axios';

import Loading from '../../components/Loading';
import List from '../../components/List';


import "./styles.css"

function Donation() {

  const { userData } = useAuth();
  const token = userData.token
  const [loading, setLoading] = useState(true);
  const [pesquisa, setPesquisa] = useState()
  const [donations, setdonations] = useState([])
  const Donation = import.meta.env.VITE_DONORS;


  useEffect(() => {
    setLoading(true); // Ativar o estado de carregamento antes da requisição

    axios.get(`${Donation}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setdonations(response.data);
        setLoading(false); // Desativar o estado de carregamento após a requisição ser completada
      })
      .catch(error => {
        console.error('Algo deu errado!', error);
        setLoading(false); // Certifique-se de desativar o estado de carregamento em caso de erro também
      });

  }, [Donation, token]);


  return (


    <div className='containerDonation'>
      <div className='contInput'>
        <FaSearch />
        <Input
          type={"text"}
          placeholder={"pesquise pelo nome do doador"}
          onChange={(event) => setPesquisa(event.target.value)}
        />
      </div>

      
      { loading ? ( // Mostrar componente de Loading enquanto estiver carregando
        <Loading />
      ) : (
        <List
          users={donations}
          onClick={(user) => onClickModal(user)}
        />
      )}
    



    </div>
  )
}

export default Donation;