import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

import './styles.css';

const Loading = () => {
    return (
        <div className='Loading'>
            <div className='LoadingIcon'>
                <FontAwesomeIcon icon={faRefresh} spin />
            </div>
            <span className='LoadingText'>Carregando<span className='dot1'>.</span>
                <span className='dot2'>.</span>
                <span className='dot3'>.</span>
            </span>

        </div>
    );
};

export default Loading;
