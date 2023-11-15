import PropTypes from 'prop-types';
import './InputStyles.css';

function Input({ type, placeholder, onChange }) {
    return <input className='Input' type={type} placeholder={placeholder} onChange={onChange} />;
}

Input.propTypes = {
    type: PropTypes.string, //Se uma prop não for marcada como isRequired, ela é considerada opcional. Se uma prop opcional não for fornecida, ela será undefined
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

export default Input;
