import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const LeftTabItem = ({ src, alt, text, path }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (path) {
            navigate(path);
        }
    };

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
                    color: '#757575',
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
