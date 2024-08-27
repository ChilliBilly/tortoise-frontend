import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainComponent.css';
import globeImage from '../../resources/images/globe-network.png';
import { UserContext } from '../../context/UserContext';
import { motion } from 'framer-motion';

function MainComponent() {
    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    const handleGetStarted = () => {
        if (token) {
            navigate('/tabview'); // Adjust the path as needed
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="main-section">
            <div className="text-section">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    Welcome to Generative Voice AI
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                >
                    Transform text into lifelike speech instantly with our cutting-edge AI voice generator.
                    Perfect for video creators, developers, and businesses seeking high-quality voice synthesis
                    in multiple languages. Experience seamless integration and high performance, all at your fingertips.
                </motion.p>
                <motion.button
                    className="get-started-button"
                    onClick={handleGetStarted}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                >
                    Get Started
                </motion.button>
            </div>
            <motion.div
                className="image-section"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
            >
                <img
                    src={globeImage}
                    alt="Globe"
                    className="globe-image"
                />
            </motion.div>
        </div>
    );
}

export default MainComponent;
