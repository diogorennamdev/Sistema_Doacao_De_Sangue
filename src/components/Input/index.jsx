import PropTypes from 'prop-types';
import './styles.css';

function Input({ type, placeholder, onChange, value, maxLength, className }) {
    return (
        <input
            className={`Input ${className}`} // Add the 'Input' class and the provided class
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            maxLength={maxLength} // Add maxLength attribute
            autoComplete='on'
        />
    );
}

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    maxLength: PropTypes.number,
    className: PropTypes.string,
};

export default Input;
