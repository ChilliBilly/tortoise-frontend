import React from 'react';

const LeftTabItem = ({ src, alt, text }) => {
    return (
        <div style={{ margin: '0', padding: '0', width: '100%', display: 'flex', flexDirection: 'row', gap: '15px', height: '30px', alignItems: 'center', userSelect: 'none' }}>
            <img src={src} style={{ width: '15px', height: '15px', userSelect: 'none' }} alt={alt} />
            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>{text}</p>
        </div>
    );
};

export default LeftTabItem;