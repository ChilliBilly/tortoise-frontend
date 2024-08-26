import LeftTabFragment from "../../fragment/tts/LeftTabFragment";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';

function LeftTabComponent({ onToggle }) {

    const { setUserId } = useContext(UserContext);
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <LeftTabFragment onLogout={handleLogout} />
        </div>
    );
}

export default LeftTabComponent;
