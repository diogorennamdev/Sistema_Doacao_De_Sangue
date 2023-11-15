import React from 'react';
import './styles.css';

function Input({ type, placeholder, onChange }) {
    return <input className='Input' type={type} placeholder={placeholder} onChange={onChange} />;
}

export default Input;
