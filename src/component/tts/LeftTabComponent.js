import LeftTabFragment from "../../fragment/tts/LeftTabFragment";

function LeftTabComponent() {
    const handleLogout = () => {
        // Clear user session and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login page
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <LeftTabFragment onLogout={handleLogout} />
        </div>
    );
}

export default LeftTabComponent;
