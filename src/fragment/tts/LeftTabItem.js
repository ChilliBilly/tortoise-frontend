import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';

const LeftTabItem = ({ src, alt, text, path }) => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location


    const handleClick = () => {
        if (path) {
            navigate(path);
        }
    };

    const textColor = location.pathname === path ? '#367AFF' : '#757575'; // Blue if current path matches, gray otherwise

    return (
        <div
            style={{
                margin: '0',
                padding: '0',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                gap: '15px',
                height: '30px',
                alignItems: 'center',
                userSelect: 'none',
                cursor: 'pointer'
            }}
            onClick={handleClick}
        >
            <img
                src={src}
                style={{
                    width: '15px',
                    height: '15px',
                    userSelect: 'none'
                }}
                alt={alt}
            />
            <p
                style={{
                    color: textColor,
                    fontSize: '14px',
                    margin: '0',
                    padding: '0',
                    userSelect: 'none'
                }}
            >
                {text}
            </p>
        </div>
    );
};

LeftTabItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    path: PropTypes.string // Optional path prop for navigation
};

export default LeftTabItem;
