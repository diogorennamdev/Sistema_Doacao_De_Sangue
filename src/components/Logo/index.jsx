import heart from '/heart.svg';
import reverseHeart from '/reverseHeart.svg?url';
import './styles.css';

function Logo() {
    return (
        <div className="ContainerLogo">
            <img className='ImgLogo' src={heart} alt="Logo" />
            <h1 className='ContainerTitle'>HemoVida Unifg</h1>
        </div>
    );
}

function LogoReverse() {
    return (
        <div className="ContainerLogoReverse">
            <img className='ImgLogoReverse' src={reverseHeart} alt="Logo" />
            <h1 className='ContainerTitleReverse'>HemoVida Unifg</h1>
        </div>
    );
}

export { Logo, LogoReverse };


