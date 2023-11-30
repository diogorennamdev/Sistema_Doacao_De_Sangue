import { Outlet } from 'react-router-dom';
import Navbar from '../src/components/NavBar';

function App() {
    return (
            <div className='App'>
                <Navbar />
                <Outlet />  
            </div>
    );
}

export default App;
