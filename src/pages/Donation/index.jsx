import React, { useState, useEffect } from 'react'
import Input from '../../components/Input';
import { FaSearch } from "react-icons/fa";
import { useAuth } from '../../Contexts/useAuth';
import axios from 'axios';


import "./styles.css"

function Donation() {

    const { userData } = useAuth();
    const token = userData.token
    console.log(token)

    const [pesquisa, setPesquisa] = useState()
    const [doadores, setDoadores] = useState([])

    const Donation = import.meta.env.VITE_DONORS;


    useEffect(() => {
        axios.get(`${Donation}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            setEmployees(response.data);
          })
          .catch(error => {
            console.error('Algo deu errado!', error);
          });
      }, [employee, token]);
    

    return (


        <div className='containerDonation'>
            <div className='containerInput'>
                <FaSearch />
                <Input
                    type={"text"}
                    placeholder={"pesquise pelo nome do doador"}
                    onChange={(event) => setPesquisa(event.target.value)}
                />
            </div>



        </div>
    )
}

export default Donation;