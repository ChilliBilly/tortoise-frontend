import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainComponent.css';
import globeImage from '../../resources/images/globe-network.png';
import { UserContext } from '../../context/UserContext';

function MainComponent() {
    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    const handleGetStarted = () => {
        if (token) {
            // If logged in, navigate to the TabView
            navigate('/tabview'); // Adjust the path as needed
        } else {
            // If not logged in, navigate to the login page
            navigate('/login');
        }
    };

    return (
        <div className="main-section">
            <div className="text-section">
                <h1>Generative Voice AI</h1>
                <p>
                    Convert text to speech online for free with our AI voice generator.
                    Create natural AI voices instantly in any language - perfect for video
                    creators, developers, and businesses.
                </p>
                <button className="get-started-button" onClick={handleGetStarted}>
                    Get Started
                </button>
            </div>
            <div className="image-section">
                <img
                    src={globeImage}
                    alt="Globe"
                    className="globe-image"
                />
            </div>
        </div>
    );
}

export default MainComponent;
