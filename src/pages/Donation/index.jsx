import React, { useState, useEffect } from 'react'
import Input from '../../components/Input';
import { FaSearch } from "react-icons/fa";
import { useAuth } from '../../Contexts/useAuth';
import axios from 'axios';
import Card from '../../components/Card';


import "./styles.css"

function Donation() {

  const { userData } = useAuth();
  const token = userData.token
  console.log(token)

  const [pesquisa, setPesquisa] = useState()
  const [employees, setEmployees] = useState([])
  console.log(employees)

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
  }, [token]);


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

      {employees?.map((employee) => (
        <Card
          key={employee._id}
          name={employee.name}
        />
      ))}



    </div>
  )
}

export default Donation;