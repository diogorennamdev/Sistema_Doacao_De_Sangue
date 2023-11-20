import heart from '/heart.svg';
import './styles.css';

function Logo() {
    return (
        <div className="ContainerLogo">
            <img src={heart} alt="Logo" />
            <h1 className='ContainerTitle'>HemoVida Unifg</h1>
        </div>
    );
}

export default Logo;