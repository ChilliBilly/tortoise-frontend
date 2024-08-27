// ErrorPopup.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useError } from '../context/ErrorContext';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* Slightly more opaque */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Ensure high z-index */
`;

const PopupContainer = styled(motion.div)`
  background: #fff;
  border-radius: 12px; /* Increased border-radius for a softer look */
  padding: 20px;
  max-width: 90vw; /* Responsive max-width */
  width: 100%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Subtle shadow */
  text-align: center;
  position: relative;
  z-index: 10000; /* Ensure it’s above the overlay */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #e74c3c;
  border: none;
  border-radius: 50%;
  color: #fff;
  width: 35px;
  height: 35px;
  font-size: 22px; /* Increase font-size for better alignment */
  line-height: 1; /* Adjust line-height */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  &:hover {
    background: #c0392b;
    transform: scale(1.1); /* Slightly larger on hover */
  }
`;

const ErrorTitle = styled.h2`
  color: #e74c3c;
  margin-bottom: 15px;
  font-size: 1.5em;
  font-weight: 600;
`;

const ErrorMessage = styled.p`
  color: #333;
  font-size: 1em;
  line-height: 1.4;
`;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const popupVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

const ErrorPopup = () => {
  const { error, clearError } = useError();

  if (!error) return null;

  return (
    <Overlay
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={clearError}
    >
      <PopupContainer
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={clearError}>&times;</CloseButton>
        <ErrorTitle>Error</ErrorTitle>
        <ErrorMessage>{error}</ErrorMessage>
      </PopupContainer>
    </Overlay>
  );
};

export default ErrorPopup;
