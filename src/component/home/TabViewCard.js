import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './TabViewCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faVolumeUp } from '@fortawesome/free-solid-svg-icons'; // Import the icons

const TabViewCard = () => {
    const navigate = useNavigate();
    const [selectedCard, setSelectedCard] = useState(null);


    useEffect(() => {
        const handleMouseMove = (e) => {
            document.querySelectorAll('.tab-option').forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100; // Increased multiplier
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100; // Increased multiplier

                card.style.setProperty('--x', `${x}px`);
                card.style.setProperty('--y', `${y}px`);
            });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleCardClick = (path) => {
        setSelectedCard(path);
        setTimeout(() => {
            navigate(path);
        }, 500); // Adjust this timeout to match the animation duration
    };

    return (
        <div className="tab-view-card-container">
            <AnimatePresence>
                {selectedCard && (
                    <motion.div
                        className="full-screen-animation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                )}
            </AnimatePresence>

            <motion.div
                className={`tab-option ${selectedCard === '/tts' ? 'selected' : ''}`}
                onClick={() => handleCardClick('/tts')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                layoutId="tab-option" // Add this layoutId for the animation effect
            >
                <div className="tab-text">
                    <div className="icon-background tts-icon">
                        <FontAwesomeIcon icon={faVolumeUp} className="icon" />
                    </div>
                    <h2>Text-to-Speech</h2>
                    <p>Convert your text into natural-sounding speech with ease.</p>
                </div>
            </motion.div>

            <motion.div
                className={`tab-option ${selectedCard === '/voiceclone' ? 'selected' : ''}`}
                onClick={() => handleCardClick('/voiceclone')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                layoutId="tab-option" // Add this layoutId for the animation effect
            >
                <div className="tab-text">
                    <div className="icon-background vc-icon">
                        <FontAwesomeIcon icon={faMicrophone} className="icon" />
                    </div>
                    <h2>Voice Cloning</h2>
                    <p>Create a digital clone of your voice for personalized experiences.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default TabViewCard;
