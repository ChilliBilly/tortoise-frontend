import './TextToSpeechPage.css';
import HeaderTabComponent from '../component/tts/HeaderTabComponent';
import InputTabComponent from '../component/tts/InputTabComponent';
import LeftTabComponent from '../component/tts/LeftTabComponent';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function TextToSpeechPage() {
    const [isLeftTabVisible, setIsLeftTabVisible] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const handleToggleLeftTab = () => {
        setIsLeftTabVisible(prev => !prev);
    };

    useEffect(() => {
        if (isLeftTabVisible) {
            // Simulate the animation completion
            const timer = setTimeout(() => {
                setIsLoaded(true);
            }, 500); // Match the duration of the width animation
            return () => clearTimeout(timer);
        } else {
            setIsLoaded(false);
        }
    }, [isLeftTabVisible]);

    return (
        <div className="flex-container" style={{ display: 'flex', height: '100vh', width: '100vw' }}>
            <motion.div
                initial={{ width: '250px' }}
                animate={{ width: isLeftTabVisible ? '250px' : '0px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ overflow: 'visible', borderRight: '1px solid #eeeeee', position: 'relative' }}
            >
                <motion.button
                    onClick={handleToggleLeftTab}
                    style={{
                        position: 'absolute',
                        top: '150px',
                        right: isLeftTabVisible ? '-15px' : '-30px',
                        transform: 'translateY(-50%)',
                        padding: '8px',
                        border: '1px solid #eeeeee',
                        borderRadius: '5px',
                        backgroundColor: 'white',
                        color: '#367AFF',
                        cursor: 'pointer',
                        width: '30px',
                        height: '30px',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <FontAwesomeIcon icon={isLeftTabVisible ? faChevronLeft : faChevronRight} />
                </motion.button>
                <AnimatePresence>
                    {isLeftTabVisible && isLoaded && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ width: '100%', height: '100%' }} // Ensure the div takes up the full spac
                        >
                            <LeftTabComponent />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            <div className="flex-column" style={{ height: '100%', width: '100%', position: 'relative' }}>
                <div style={{ margin: '0', padding: '0', height: '10%', minHeight: '120px' }}>
                    <HeaderTabComponent
                        title="Speech Synthesis"
                        subtitle="Use our smart text to speech tool to generate realistic, captivating speech in Vietnamese" />
                </div>
                <div style={{ margin: '0', padding: '0', height: '90%', width: '100%', overflowY: 'hidden' }}>
                    <InputTabComponent />
                </div>
            </div>
        </div>
    );
}

export default TextToSpeechPage