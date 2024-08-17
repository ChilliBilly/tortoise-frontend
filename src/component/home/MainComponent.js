import React from 'react';
import './MainComponent.css';
import globeImage from '../../resources/images/globe-network.png';

function MainComponent() {
    return (
        <div className="main-section">
            <div className="text-section">
                <h1>Generative Voice AI</h1>
                <p>
                    Convert text to speech online for free with our AI voice generator.
                    Create natural AI voices instantly in any language - perfect for video 
                    creators, developers, and businesses.
                </p>
                <button className="get-started-button">Get Started</button>
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
